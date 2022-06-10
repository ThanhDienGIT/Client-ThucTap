import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CustomerFormAdd from './CustomerFormAdd';
import CustomerFormView from './CustomerFormView';
import CustomerFormEdit from './CustomerFormEdit';
import CustomerFormDelete from './CustomerFormDelete';
import { autocompleteClasses, Box, TextField } from '@mui/material';
import CustomerSearch from './CustomerSearch';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const style = {
    display: 'flex',
    width: 'auto',
    marginLeft: 2,
    color: 'black',
    alignItems: "center",
    justifyContent: "center"
};

function Customer() {

    const [searchField, setSearchField] = React.useState(1);

    const [searchInput, setSearchInput] = React.useState('');

    const [showTablePagination, setShowTablePagination] = React.useState(true);

    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [statusCustomer, setStatusCustomer] = React.useState(1);

    const [customers, setCustomer] = React.useState([])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const [resetPage, setResetPage] = React.useState(true)

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const showCustomer = function (customer) {
        return (
            <TableRow
                key={customer.IDKhachHang}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row" >
                    {customer.MaKhachHang}
                </TableCell>
                <TableCell>{customer.TenLoai}</TableCell>
                <TableCell>{customer.HoTenKH}</TableCell>
                <TableCell>{customer.CCCD}</TableCell>
                <TableCell>{customer.DiaChi}</TableCell>
                <TableCell>{customer.TenXaPhuong}</TableCell>
                <TableCell>{customer.TenQuanHuyen}</TableCell>
                <TableCell align='left' width={1}>
                    <CustomerFormView customer={customer}></CustomerFormView>
                </TableCell>
                <TableCell align='left' width={1} >
                    <CustomerFormEdit customer={customer}></CustomerFormEdit>
                </TableCell>
                <TableCell align='left' width={1}>
                    <CustomerFormDelete customer={customer}></CustomerFormDelete>
                </TableCell>
            </TableRow>
        );
    }
    const handleResetPage = function () {
        setResetPage(!resetPage)
        console.log(resetPage)
    }
    const showCustomerByField = function (customer) {
        switch(searchField){
            case 1:{
                if (customer.HoTenKH.includes(searchInput)) {
                    return (
                        showCustomer(customer)
                    );
                }
                break;
            }
            case 2:{
                if (customer.MaKhachHang.includes(searchInput)) {
                    return (
                        showCustomer(customer)
                    );
                }
                break;
            }
            case 3:{
                if (customer.DiaChi.includes(searchInput)) {
                    return (
                        showCustomer(customer)
                    );
                }
                break;
            }
            case 4:{
                if (customer.TenXaPhuong.includes(searchInput)) {
                    return (
                        showCustomer(customer)
                    );
                }
                break;
            }
            case 5:{
                if (customer.TenQuanHuyen.includes(searchInput)) {
                    return (
                        showCustomer(customer)
                    );
                }
                break;
            }
        }   
    }

    React.useEffect(() => {
        axios.get(`http://localhost:5199/api/KhachHang/` + statusCustomer)
            .then(res => {
                const Customers = res.data;
                setCustomer(Customers);
            })
    }, [resetPage, statusCustomer])

    const handleChangeSearchInput = (event) => {
        setSearchInput(event.target.value)
        console.log(searchInput)
    }

    const handleChangeSearchField = (event) => {
        setSearchField(event.target.value);
        console.log(searchField)
    };

    const handleShowTablePagination = function () {
        if (showTablePagination)
            return (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={customers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            );
    }
    return (
        <div>
            <Box sx={style}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={searchField}
                        onChange={handleChangeSearchField}
                    >
                        <MenuItem value={1}>Họ Tên</MenuItem>
                        <MenuItem value={2}>Mã Khách Hàng</MenuItem>
                        <MenuItem value={3}>Địa Chỉ</MenuItem>
                        <MenuItem value={4}>Xã Phường</MenuItem>
                        <MenuItem value={5}>Quận Huyện</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: '70ch' }}>
                    <InputLabel htmlFor="outlined-adornment-search">Tìm Kiếm</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-search"
                        type="text"
                        onChange={handleChangeSearchInput}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="button search"
                                    edge="end"
                                    onClick={handleChangeSearchInput}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <CustomerFormAdd></CustomerFormAdd>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead color="black">
                        <TableRow>
                            <TableCell >Mã Khách Hàng</TableCell>
                            <TableCell >Loại Khách Hàng</TableCell>
                            <TableCell >Tên Khách Hàng</TableCell>
                            <TableCell >Căn Cước Công Dân</TableCell>
                            <TableCell >Địa Chỉ</TableCell>
                            <TableCell >Xã Phường</TableCell>
                            <TableCell >Quận Huyện</TableCell>
                            <TableCell align='center' colSpan={3} width={5}>Thao Tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchInput !== "" ?
                            customers
                                .map((customer) => (
                                    showCustomerByField(customer)
                                ))
                            :
                            customers
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((customer) => (
                                    <TableRow
                                        key={customer.IDKhachHang}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" >
                                            {customer.MaKhachHang}
                                        </TableCell>
                                        <TableCell>{customer.TenLoai}</TableCell>
                                        <TableCell>{customer.HoTenKH}</TableCell>
                                        <TableCell>{customer.CCCD}</TableCell>
                                        <TableCell>{customer.DiaChi}</TableCell>
                                        <TableCell>{customer.TenXaPhuong}</TableCell>
                                        <TableCell>{customer.TenQuanHuyen}</TableCell>
                                        <TableCell align='left' width={1}>
                                            <CustomerFormView customer={customer}></CustomerFormView>
                                        </TableCell>
                                        <TableCell align='left' width={1} >
                                            <CustomerFormEdit customer={customer} handleResetPage={handleResetPage}></CustomerFormEdit>
                                        </TableCell>
                                        <TableCell align='left' width={1}>
                                            <CustomerFormDelete customer={customer}></CustomerFormDelete>
                                        </TableCell>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>
                {handleShowTablePagination()}
            </TableContainer>
        </div>
    )
}

export default Customer