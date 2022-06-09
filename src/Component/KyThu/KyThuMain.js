import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
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
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import KyThuFilter from './KyThuFilter';
import Stack from '@mui/material/Stack';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Typography from '@mui/material/Typography';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


export default function KyThuMain() {
    const [rows, setRows] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [updateState, setUpdateState] = React.useState(true);
    const [searchMonth, setSearchMonth] = React.useState(-1);
    const [searchYear, setSearchYear] = React.useState(-1);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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

    const handleChangeMonth = (month) => {
        setSearchMonth(month);
    };

    const handleChangeYear = (year) => {
        setSearchYear(year);
    };

    React.useEffect(() => {
        fetch("http://localhost:5199/api/kythu/" + searchMonth + "/" + searchYear)
            .then(response => response.json())
            .then(function (kyThu) {
                setRows(kyThu);
            },
                (error) => {
                    alert('Failed');
                })
    }, [updateState, searchMonth, searchYear])

    return (
        <>
            <Typography variant="p"
                sx={
                    {
                        fontSize: 30,
                        color: "var(--color2)",
                        fontWeight: "bold"
                    }
                }
            >
                Quản lý kỳ thu
                <IconButton>
                    <Tooltip title="Tải lại">
                        <RefreshIcon onClick={() => window.location.reload()} />
                    </Tooltip>
                </IconButton>
            </Typography>

            <KyThuAddModal reRenderKyThuMain={reRender} />
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
                <KyThuFilter
                    month={searchMonth}
                    year={searchYear}
                    changeMonth={handleChangeMonth}
                    changeYear={handleChangeYear}
                />
            </Stack>
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
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
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

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                                colSpan={4}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}

