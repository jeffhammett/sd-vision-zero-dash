import axios from "axios";
import { ALL } from "../utils/constants";
import type {
  Incident,
  IncidentFilter,
  IncidentList,
  IncidentMetadata,
  ListIncidentsQuery,
  Severity,
} from "../api/types";
import dayjs, { Dayjs } from "dayjs";

// Re-exported so existing component imports keep working.
export type { Incident, IncidentFilter, IncidentList, IncidentMetadata };

const API_BASE_URL: string =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:5000";

/** UI-side filter state: the dropdown values, where ALL means "no filter". */
export type IncidentFilterSelection = {
  neighborhood?: string;
  severity?: string;
  startDate?: Dayjs;
  endDate?: Dayjs;
};

const dateFormat = "YYYY-MM-DD";

function toIncidentFilter(selection: IncidentFilterSelection): IncidentFilter {
  const { neighborhood, severity, startDate, endDate } = selection;
  const filter: IncidentFilter = {};
  if (neighborhood && neighborhood !== ALL) {
    filter.neighborhoods = [neighborhood];
  }
  if (severity && severity !== ALL) {
    filter.severity = severity as Severity;
  }
  if (startDate) {
    filter.startDate = startDate.format(dateFormat);
  }
  if (endDate) {
    filter.endDate = endDate.format(dateFormat);
  }
  return filter;
}

export async function fetchIncidents(
  selection: IncidentFilterSelection,
  page: number,
  pageSize: number,
): Promise<IncidentList> {
  const params: ListIncidentsQuery = {
    page,
    pageSize,
    filter: JSON.stringify(toIncidentFilter(selection)),
  };
  const response = await axios.get<IncidentList>(`${API_BASE_URL}/incidents`, {
    params,
  });
  return response.data;
}

export async function fetchIncidentMetadata(): Promise<IncidentMetadata> {
  const response = await axios.get<IncidentMetadata>(
    `${API_BASE_URL}/incidents/metadata`,
  );
  return response.data;
}
