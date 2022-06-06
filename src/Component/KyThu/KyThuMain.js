import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function KyThuMain() {
    const [rows, setRows] = React.useState([]);
    React.useEffect( () => {
        fetch("http://localhost:5199/api/kythu")
        .then(response => response.json())
        .then(function(kyThu){
            setRows(kyThu);
            console.log(kyThu);
        })
    },[])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tên Kỳ thu</TableCell>
                        <TableCell align="center">Tháng</TableCell>
                        <TableCell align="center">Năm</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.IDKyThu}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.TenKyThu}
                            </TableCell>
                            <TableCell align="center">{row.Thang}</TableCell>
                            <TableCell align="center">{row.Nam}</TableCell>
                            <TableCell align="center">Thêm</TableCell>
                            <TableCell align="center">Sửa</TableCell>
                            <TableCell align="center">Xoá</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

