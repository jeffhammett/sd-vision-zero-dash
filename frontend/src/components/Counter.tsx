import { Stack, Typography } from "@mui/material";

interface CounterProps {
    days: number,
}

const Counter: React.FC<CounterProps> = (props: CounterProps) => {
    const { days: numDays } = props
    const dayText: string = numDays === 1 ? 'Day' : 'Days'
    return (
        <Stack sx={{ p: 4, alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="h1" component="h1">
                {numDays}
            </Typography>
            <Typography variant="h1" component="h1">
                {dayText} since someone was hurt or killed on San Diego's roads
            </Typography>
        </Stack>
    )
}

export default Counter
