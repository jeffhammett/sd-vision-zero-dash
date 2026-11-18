import os
from services.aws_service import read_file_s3
from services.pd_service import (
    get_incident_metadata,
    get_incidents_and_count,
    map_incident_df_to_incident_list_dto,
    read_pd_csv,
    filter_for_casualties,
)
from entity.generated import IncidentFilter, IncidentList, IncidentMetadata
from flask_cors import CORS
from dotenv import load_dotenv
from flask import Flask, Response, jsonify, request

app = Flask(__name__)
load_dotenv()

# Configure CORS - restrict to frontend URL in production
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
CORS(app, origins=allowed_origins)


@app.route("/articles")
def articles() -> Response:
    # fetch df
    df = read_file_s3(os.getenv("S3_ARTICLES_FILENAME"))
    # filter out non relevant articles
    df = df[df["is_relevant"]]
    # sort by date
    df = df.sort_values(by="date_posted", ascending=False)
    # Shape documented by components.schemas.Article in openapi.yaml
    return Response(df.to_json(orient="records"), mimetype="application/json")


@app.route("/incidents")
def incidents() -> tuple[Response, int]:
    # Parse pagination parameters
    incident_filter: IncidentFilter = IncidentFilter.model_validate_json(
        request.args.get("filter", default="{}")
    )
    page: int = request.args.get("page", default=1, type=int)
    page_size: int = request.args.get("pageSize", default=10, type=int)

    # Fetch paginated incidents
    incidents_df, total = get_incidents_and_count(
        incident_filter.model_dump(exclude_none=True), page=page, page_size=page_size
    )

    # Map to DTO
    mapped_response: IncidentList = map_incident_df_to_incident_list_dto(incidents_df, page, page_size, total)

    return jsonify(mapped_response.model_dump(mode="json", by_alias=True)), 200


@app.route("/incidents/metadata")
def incident_metadata() -> tuple[Response, int]:
    df = read_pd_csv()
    filtered_df = filter_for_casualties(df)
    metadata: IncidentMetadata = get_incident_metadata(filtered_df)
    return jsonify(metadata.model_dump(mode="json", by_alias=True)), 200
