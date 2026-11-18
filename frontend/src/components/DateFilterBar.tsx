import { Button, FormGroup, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface DateFilterBarProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  setStartDate: (date: Dayjs | null) => void;
  setEndDate: (date: Dayjs | null) => void;
  disabled: boolean;
}

export const DateFilterBar: React.FC<DateFilterBarProps> = (
  props: DateFilterBarProps,
) => {
  const { startDate, setStartDate, endDate, setEndDate, disabled } = props;
  const today = dayjs(new Date());

  const handleSubmit = (event: React.FormEvent) => {};

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormGroup>
        <Stack direction="row" spacing={2} justifyContent={"center"}>
          <DatePicker
            label={"Start Date"}
            value={startDate}
            maxDate={today}
            disabled={disabled}
            onChange={(newValue) => {
              setStartDate(newValue);
              console.log(newValue?.toString());
              // If start date goes past the end date, reset end date
              if (newValue && endDate && newValue.isAfter(endDate)) {
                setEndDate(null);
              }
            }}
            slotProps={{
              textField: {
                clearable: true, // Enables the built-in clear icon in the text field
                onClear: () => setStartDate(null), // Clears state when clicked
              },
            }}
          />
          <DatePicker
            label={"End Date"}
            value={endDate}
            minDate={startDate ?? undefined}
            maxDate={today}
            disabled={disabled}
            onChange={(newValue) => {
              setEndDate(newValue);
              // If start date goes past the end date, reset end date
              if (newValue && startDate && startDate.isAfter(endDate)) {
                setStartDate(null);
              }
            }}
            slotProps={{
              textField: {
                clearable: true, // Enables the built-in clear icon in the text field
                onClear: () => setEndDate(null), // Clears state when clicked
              },
            }}
          />
          <Button type="submit" variant="outlined" color="secondary">
            Apply
          </Button>
        </Stack>
      </FormGroup>
    </LocalizationProvider>
  );
};
