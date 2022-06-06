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

function Customer() {
    const [customers, setCustomer] = useState([])
    React.useEffect(() => {
        axios.get(`http://localhost:5199/api/KhachHang`)
            .then(res => {
                const Customers = res.data;
                setCustomer(Customers);
            })
        // fetch("http://localhost:5199/api/KhachHang")
        //     .then(response => response.json())
        //     .then(function (customer) {
        //         setCustomer(customer);
        //     })
    }, [])
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell >Mã Khách Hàng</TableCell>
                            <TableCell >Tên Khách Hàng</TableCell>
                            <TableCell >Địa Chỉ</TableCell>
                            <TableCell align='center' colSpan={3}>Thao Tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {customers.map((customer) => (
                            <TableRow
                                key={customer.IDKhachHang}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {customer.MaKhachHang}
                                </TableCell>
                                <TableCell>{customer.HoTenKH}</TableCell>
                                <TableCell>{customer.DiaChi}</TableCell>
                                <TableCell align='right' width={10}><Button variant="contained">Xem</Button></TableCell>
                                <TableCell align='right' width={10}><Button variant="contained">Sửa</Button></TableCell>
                                <TableCell align='right' width={10}><Button variant="contained">Xoá</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
            </TableContainer>
        </div>
    )
}

export default Customer