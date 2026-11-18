/**
 * Friendly aliases over the generated OpenAPI types.
 *
 * `schema.d.ts` is generated from ../../openapi.yaml by `npm run generate:api`;
 * never edit it by hand. Import from this file instead of from schema.d.ts so
 * call sites don't have to spell out components["schemas"][...].
 */
import type { components, operations } from "./schema";

export type Incident = components["schemas"]["Incident"];
export type IncidentList = components["schemas"]["IncidentList"];
export type IncidentMetadata = components["schemas"]["IncidentMetadata"];
export type IncidentFilter = components["schemas"]["IncidentFilter"];
export type Severity = components["schemas"]["Severity"];

export type Article = components["schemas"]["Article"];
export type ArticleSource = components["schemas"]["ArticleSource"];

export type ListIncidentsQuery = NonNullable<
  operations["listIncidents"]["parameters"]["query"]
>;
