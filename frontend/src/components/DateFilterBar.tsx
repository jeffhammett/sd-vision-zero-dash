import { FormControlLabel, FormGroup, Stack, Switch } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

interface DateFilterBarProps {
    setStartMonth: () => {}
    setEndtMonth: () => {}
}

const styles = {
  color: '#fff',
  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
}

export const DateFilterBar: React.FC<DateFilterBarProps> = (props: DateFilterBarProps) => {
    const [showEndMonth, setShowEndMonth] = useState(true)

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormGroup>
            <Stack direction="row" spacing={2} justifyContent={'center'}>
                <DatePicker sx={styles} label={'Start Month'} views={['month', 'year']} />
                {showEndMonth && <DatePicker sx={styles} label={'End Month'} views={['month', 'year']} />}
                <FormControlLabel control={<Switch onChange={() => setShowEndMonth(!showEndMonth)} />} label="Single Month" />
            </Stack>
                </FormGroup>
        </LocalizationProvider>
    )
}