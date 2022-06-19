import React from 'react'
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import { tableCellClasses } from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import { autocompleteClasses, Box, TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// Table Style
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'var(--color3)',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const actionAreaStyle = {
    display: 'flex',
    justifyContent: 'space-between'
};

function DistrictAndWard() {

    const [chosenField, setChosenField] = React.useState('XaPhuong');

    const [showTablePagination, setShowTablePagination] = React.useState(true);

    const [wards, setWards] = React.useState([]);

    const [districts, setDistricts] = React.useState([]);

    const [page, setPage] = React.useState(0);

    const [resetPage, setResetPage] = React.useState(true)

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleResetPage = function () {
        setResetPage(!resetPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleShowTablePagination = function () {
        if (chosenField === "XaPhuong") {
            if (showTablePagination)
                return (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={wards.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                );
        } else {
            return (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={districts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            );
        }
    }

    React.useEffect(() => {
        axios.get(`http://localhost:5199/api/QuanHuyen`)
            .then(res => {
                const districts = res.data;
                setDistricts(districts);
            })
    }, [])

    React.useEffect(() => {
        axios.get(`http://localhost:5199/api/XaPhuong/`)
            .then(res => {
                const wards = res.data;
                setWards(wards);
            })
    }, [])

    const handleChangeChosenField = (event, newField) => {
        setChosenField(newField);
    };

    const showDistrictsAndWards = function (Rows) {
        if (chosenField === "XaPhuong") {
            if (Rows.length > 0) {
                return (
                    Rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <StyledTableRow
                                key={row.IDXaPhuong}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">{row.IDXaPhuong}
                                </StyledTableCell>
                                <StyledTableCell>{row.TenXaPhuong}</StyledTableCell>
                                <StyledTableCell>{row.TenQuanHuyen}</StyledTableCell>
                                <StyledTableCell align='center'>
                                    <ButtonGroup variant="text" aria-label="outlined button group">
                                        <Button>Sửa</Button>
                                        <Button>Xoá</Button>
                                    </ButtonGroup>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))
                );
            } else {
                return (
                    <TableRow>
                        <StyledTableCell align='center' colSpan={8} width={5}>Không tìm thấy kết quả tương ứng</StyledTableCell>
                    </TableRow>
                )
            }
        } else {
            if (Rows.length > 0) {
                return (
                    Rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <StyledTableRow
                                key={row.IDQuanHuyen}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">{row.IDQuanHuyen}
                                </StyledTableCell>
                                <StyledTableCell>{row.TenQuanHuyen}</StyledTableCell>
                                <StyledTableCell align='center'>
                                    <ButtonGroup variant="text" aria-label="outlined button group">
                                        <Button>Sửa</Button>
                                        <Button>Xoá</Button>
                                    </ButtonGroup>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))
                );
            } else {
                return (
                    <TableRow>
                        <StyledTableCell align='center' colSpan={8} width={5}>Không tìm thấy kết quả tương ứng</StyledTableCell>
                    </TableRow>
                )
            }
        }
    }

    return (
        <div>
            <Typography variant="p"
                sx={
                    {
                        fontSize: 30,
                        color: "var(--color2)",
                        fontWeight: "bold",
                    }
                }
            >
                Tỉnh Thành
            </Typography>
            <Divider sx={{ marginBottom: 3 }}></Divider>
            <Box sx={actionAreaStyle}>
                {/* Toggle CustomerType */}
                <ToggleButtonGroup
                    exclusive
                    aria-label="CustomerType"
                    value={chosenField}
                    onChange={handleChangeChosenField}
                >
                    <ToggleButton
                        color='primary'
                        value='xaphuong'
                        aria-label='xaphuong'
                        key='xaphuong'
                        sx={{
                            border: 0,
                            fontWeight: "bold",
                            borderRadius: 2,
                            backgroundColor: "var(--color1)",
                        }}
                    >
                        Xã Phường
                    </ToggleButton>
                    <ToggleButton
                        color='primary'
                        value='quanhuyen'
                        aria-label='quanhuyen'
                        key='quanhuyen'
                        sx={{
                            border: 0,
                            fontWeight: "bold",
                            borderRadius: 2,
                            backgroundColor: "var(--color1)",
                        }}
                    >
                        Quận Huyện
                    </ToggleButton>
                </ToggleButtonGroup>
                <Stack direction="row" spacing={2} alignItems="flex-end" marginBottom={1}>
                    <Button>Thêm Quận Huyện</Button>
                </Stack>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead color="black">
                        <TableRow>
                            <StyledTableCell style={{ width: '10%' }}>Mã Quận Huyện</StyledTableCell>
                            <StyledTableCell style={{ width: '15%' }}>Tên Xã Phường</StyledTableCell>
                            <StyledTableCell style={{ width: '15%' }}>Tên Quận Huyện</StyledTableCell>
                            <StyledTableCell align='center' style={{ width: '5%' }}>Thao Tác</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Kiểm Tra Có Sử Dụng Trường Tìm Kiếm */}
                        {chosenField === "XaPhuong" ?
                            showDistrictsAndWards(wards)
                            :
                            showDistrictsAndWards(districts)
                        }
                    </TableBody>
                </Table>
                {handleShowTablePagination()}
            </TableContainer>
        </div>
    )
}

export default DistrictAndWard