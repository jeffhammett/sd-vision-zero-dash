import { FormControlLabel, FormGroup, Stack, Switch } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

interface DateFilterBarProps {
  setStartMonth: () => {};
  setEndtMonth: () => {};
}

export const DateFilterBar: React.FC<DateFilterBarProps> = (
  props: DateFilterBarProps,
) => {
  const [showEndMonth, setShowEndMonth] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormGroup>
        <Stack direction="row" spacing={2} justifyContent={"center"}>
          <DatePicker
            label={"Start Month"}
            views={["month", "year"]}
            maxDate={endDate}
            slotProps={{
              textField: {
                clearable: true, // Enables the built-in clear icon in the text field
                onClear: () => setStartDate(null), // Clears state when clicked
              },
            }}
          />
          {showEndMonth && (
            <DatePicker
              label={"Start Month"}
              views={["month", "year"]}
              minDate={startDate}
              slotProps={{
                textField: {
                  clearable: true, // Enables the built-in clear icon in the text field
                  onClear: () => setEndDate(null), // Clears state when clicked
                },
              }}
            />
          )}
          <FormControlLabel
            control={<Switch onChange={() => setShowEndMonth(!showEndMonth)} />}
            label="Single Month"
          />
        </Stack>
      </FormGroup>
    </LocalizationProvider>
  );
};
