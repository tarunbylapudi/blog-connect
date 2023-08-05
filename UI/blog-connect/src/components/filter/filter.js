import { Grid } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';

function Filter() {
    const [loading, setLoading] = React.useState(true);
    function handleClick() {
        setLoading(true);
    }
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        // <Container maxWidth="md"></Container>
        <Grid container spacing={2} sx={{
            marginBottom: "20px",
        }}>
            <Grid item xs={12} sm={6} md={6}>
                <Item>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker />
                        {/* <span >
                                to
                            </span> */}
                        <DatePicker />
                    </LocalizationProvider>
                </Item>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Item>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Item>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Item>
                    <LoadingButton
                        color="secondary"
                        onClick={handleClick}
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                    >
                        <span>Save</span>
                    </LoadingButton>
                </Item>
            </Grid>
        </Grid>
    )
}

export default Filter;