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
import { TextField } from '@mui/material';
import CustomerSearch from './CustomerSearch';


function Customer() {
    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [statusCustomer, setStatusCustomer] = React.useState(1);

    const [customers, setCustomer] = React.useState([])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);      
    };

   

    React.useEffect(() => {
        axios.get(`http://localhost:5199/api/KhachHang/` + statusCustomer)
            .then(res => {
                const Customers = res.data;
                setCustomer(Customers);
            })
    }, [])
    
    return (

        <div>
            <CustomerFormAdd></CustomerFormAdd>
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
                        {customers
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
                                        <IconButton variant="text" color="primary">
                                            <Tooltip title="Chỉnh Sửa"><EditIcon />
                                            </Tooltip>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align='left' width={1}>
                                        <IconButton variant="text" color="primary">
                                            <Tooltip title="Xoá"><DeleteIcon />
                                            </Tooltip>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 25, 50]}
                    component="div"
                    count={customers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    )
}

export default Customer