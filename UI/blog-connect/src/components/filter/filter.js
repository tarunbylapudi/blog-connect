import { Button, Grid } from '@mui/material';
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
import SaveIcon from '@mui/icons-material/Save';
import { Link, useSubmit, useNavigate } from 'react-router-dom';

function Filter(props) {
    const submit = useSubmit();
    const navigate = useNavigate();
    const [toDate, setToDate] = React.useState("");
    const [fromDate, setFromDate] = React.useState("");
    const [category, setCategory] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    function handleClick() {
        navigate(`/blogs?category=${category}&fromDate=${fromDate.toISOString()}&toDate=${toDate.toISOString()}`)
    }
    
    const filterEligibility = () => {
        // console.log(category,toDate,fromDate);
        // console.log(category || (toDate && fromDate));
        // console.log()
        // if(category ||(toDate & fromDate)){
        //     console.log("inside");
        // }
        return !(category | (toDate & fromDate))
    }

    React.useEffect(()=>{filterEligibility()}, [filterEligibility,category,toDate,fromDate]);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
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
            marginBottom: "30px",
        }}>
            <Grid item xs={12} sm={6} md={6}>
                <Item>
                    {/* {JSON.stringify(toDate)} */}
                    {/* {toDate} */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={fromDate}
                            onChange={(newValue) => setFromDate(newValue)} />
                        {/* <span >
                                to
                            </span> */}
                        <DatePicker
                            value={toDate}
                            onChange={(newValue) => setToDate(newValue)}
                        />
                    </LocalizationProvider>
                </Item>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Item>
                    <FormControl fullWidth>
                        {/* {category} */}
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={handleCategoryChange}
                        >
                            {/* {JSON.stringify(props.category)} */}
                            {props.category.map((uniquecat) => (
                                <MenuItem value={uniquecat}>{uniquecat}</MenuItem>
                            ))}
                            {/* <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem> */}
                        </Select>
                    </FormControl>
                </Item>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Item>
                        <Button
                            disabled={filterEligibility}
                            color="secondary"
                            onClick={handleClick}
                            // loading={loading}
                            // loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                        >
                            <span>Save</span>
                        </Button>
                    
                </Item>
            </Grid>
        </Grid>
    )
}

export default Filter;