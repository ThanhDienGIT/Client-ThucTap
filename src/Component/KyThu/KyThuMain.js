import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KyThuEditModal from './KyThuEditModal';
import KyThuAddModal from './KyThuAddModal';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function KyThuMain() {
    const [rows, setRows] = React.useState([]);
    const [updateState, setUpdateState] = React.useState(true);

    const reRender = () => setUpdateState(!updateState);

    const handleDelete = (id) => {
        if (window.confirm('Xoá kỳ thu sẽ xoá theo các phiếu thu của kỳ thu tương ứng. Bạn có chắc chắn muốn xoá ?')) {
            fetch("http://localhost:5199/api/kythu/" + id, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                })
            reRender();
        }
    }

    React.useEffect(() => {
        fetch("http://localhost:5199/api/kythu")
            .then(response => response.json())
            .then(function (kyThu) {
                setRows(kyThu);
            })
    }, [updateState])

    return (
        <>
            <KyThuAddModal reRenderKyThuMain={reRender} />
            <TableContainer style={{ marginTop: 20 }} component={Paper}>
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
                                <TableCell align="center">
                                    <KyThuEditModal idKyThu={row.IDKyThu} thang={row.Thang} nam={row.Nam} reRenderKyThuMain={reRender} />
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => handleDelete(row.IDKyThu)}>
                                        <Tooltip title="Xoá">
                                            <DeleteIcon />
                                        </Tooltip>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

