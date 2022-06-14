import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import ReceiptList from '../ReceiptList';
export default function DiaChiSearch() {
    const [rows, setRows] = React.useState([]);
    // setRows(data.HoTenKH);
    // console.log('Search', rows);
    React.useEffect(() => {
    fetch("http://localhost:5199/api/PhieuThu")
        .then(response => response.json())
        .then(function (PhieuThu) {
          setRows(PhieuThu);
        },
          
            (error) => {
                alert('Failed');
            })
    }, [])
    return (
    <>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            getOptionLabel={(rows) => `${rows.HoTenKH}`}
            options={rows}
            sx={{ width: 300 }}
            isOptionEqualToValue={(option, value) =>
                option.HoTenKH === value.HoTenKH
            }
            noOptionsText={"Not Found"}
            renderOption={(props, rows) =>
                <Box component='li' {...props} key={rows.IDKhachHang}>
                    {rows.HoTenKH}
                </Box>
            }
                renderInput={(params) => <TextField {...params} label="Search..." />}
                
        />
            <ReceiptList data={rows} />
    </>
  );
}  