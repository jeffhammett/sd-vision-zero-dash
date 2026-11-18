import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { ALL } from "../utils/constants"

interface FilterBarProps {
  neighborhood: string
  setNeighborhoodFilter: (hood: string | undefined) => void
  severity: string
  setSeverityFilter: (sev: string | undefined) => void
  incidentTableLoading: boolean
}

export const NEIGHBORHOOD_OPTIONS: string[] = [
  ALL,
  "South San Diego",
  "Point Loma",
  "Coastal",
  "Central Suburbs",
  "East San Diego",
  "Northern Suburbs",
  "Mid-City",
  "Navajo Communities",
  "Urban Core",
]

export const SEVERITY_OPTIONS: string[] = [
  ALL,
  "Light",
  "Serious",
  "Fatal"
]

export const FilterBar: React.FC<FilterBarProps> = (props: FilterBarProps) => {
  const { neighborhood, setNeighborhoodFilter, severity, setSeverityFilter, incidentTableLoading } = props

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 1 }}>
      <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
        <InputLabel id="severity-filter-label">Severity</InputLabel>
        <Select
          labelId="severity-filter-label"
          value={severity}
          label="Severity"
          onChange={(event: SelectChangeEvent<string>) => setSeverityFilter(event.target.value)}
          disabled={incidentTableLoading}
        >
          {SEVERITY_OPTIONS.map((val: string) => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
        <InputLabel id="neighborhood-filter-label">Neighborhood</InputLabel>
        <Select
          labelId="neighborhood-filter-label"
          value={neighborhood}
          label="Neighborhood"
          onChange={(event: SelectChangeEvent<string>) => setNeighborhoodFilter(event.target.value)}
          disabled={incidentTableLoading}
        >
          {NEIGHBORHOOD_OPTIONS.map((hood: string) => (
            <MenuItem key={hood} value={hood}>
              {hood}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
