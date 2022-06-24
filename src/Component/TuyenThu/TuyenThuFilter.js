import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import FilterNhanVien from './FilterNhanVien';

export default function TuyenThuFilter({ nhanVien, quanHuyen, xaPhuong, nhanVienList, quanHuyenList, xaPhuongList, changeNhanVien, changeQuanHuyen, changeXaPhuong }) {
    let nhanVienOptions = nhanVienList.map((nhanVien, index) => (
        {
            id: nhanVien.IDNhanVien,
            label: nhanVien.HoTen
        }
    ));
    nhanVienOptions.push({
        id: -1,
        label: "All"
    });

    return (
        <Box sx={{ minWidth: 120 }}>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <FilterNhanVien nhanVien={nhanVien} nhanVienOptions={nhanVienOptions} changeNhanVien={changeNhanVien} />
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
                    <FormControl style={{ width: 200 }}>
                        <InputLabel>Quận huyện</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={quanHuyen}
                            label="Quận huyện"
                            onChange={event => changeQuanHuyen(event.target.value)}
                        >
                            {
                                quanHuyenList.map(quanHuyen => (
                                    <MenuItem key={quanHuyen.IDQuanHuyen} value={quanHuyen.IDQuanHuyen}> {quanHuyen.TenQuanHuyen} </MenuItem>
                                ))
                            }
                            <MenuItem key="all-QuanHuyen" value={-1}>All</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ width: 200 }}>
                        <InputLabel>Xã phường</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={xaPhuong}
                            label="Xã phường"
                            onChange={event => changeXaPhuong(event.target.value)}
                        >
                            {
                                xaPhuongList.map(xaPhuong => (
                                    <MenuItem key={xaPhuong.IDXaPhuong} value={xaPhuong.IDXaPhuong}> {xaPhuong.TenXaPhuong} </MenuItem>
                                ))
                            }
                            <MenuItem key="all-XaPhuong" value={-1}>All</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>
        </Box>
    );
}
