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
import IconButton from '@mui/material/IconButton';
import CustomerFormAdd from './CustomerFormAdd';
import CustomerFormView from './CustomerFormView';
import CustomerFormEdit from './CustomerFormEdit';
import CustomerFormDelete from './CustomerFormDelete';
import { autocompleteClasses, Box, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from '@mui/material/Stack';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import Button from '@mui/material/Button';
import { border } from '@mui/system';

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

const style = {
    display: 'flex',
    width: 'auto',
    marginTop: 5,
    marginLeft: 2,
    color: 'black',
    alignItems: "center",
    justifyContent: "center"
};

const actionAreaStyle = {
    display: 'flex',
    justifyContent: 'space-between'
};

function Customer() {

    const [searchField, setSearchField] = React.useState(1);

    const [searchInput, setSearchInput] = React.useState('');

    const [showTablePagination, setShowTablePagination] = React.useState(true);

    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [statusCustomer, setStatusCustomer] = React.useState(1);

    const [customers, setCustomer] = React.useState([])

    const [chosenCustomers, setChosenCustomer] = React.useState([])

    const [chosenDistrict, setChosenDistrict] = React.useState(0);

    const [chosenWard, setChosenWard] = React.useState(0);

    const [wards, setWards] = React.useState([]);

    const [districts, setDistricts] = React.useState([]);

    const [customerTypes, setCustomerTypes] = React.useState([]);

    const [chosenCustomerTypes, setChosenCustomerTypes] = React.useState(() => []);

    const [resetPage, setResetPage] = React.useState(true)

    React.useEffect(() => {
        axios.get(`http://localhost:5199/api/KhachHang/` + statusCustomer)
            .then(res => {
                const Customers = res.data;
                setCustomer(Customers);
            })
    }, [resetPage, statusCustomer])

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

    React.useEffect(() => {
        axios.get(`http://localhost:5199/api/LoaiKhachHang`)
            .then(res => {
                const customerTypes = res.data;
                setCustomerTypes(customerTypes);
            })
    }, [])

    React.useEffect(() => {
        handleChosenCustomer(customers)
    }, [chosenDistrict, chosenWard, searchInput, searchField, chosenCustomerTypes])

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

    const handleChangeDistrict = (event) => {
        setPage(0);
        setChosenCustomerTypes(['Hộ dân', 'Doanh Nghiệp'])
        setChosenDistrict(event.target.value);
        setChosenWard(0);
    };

    const handleChangeWard = (event) => {
        setPage(0);
        setChosenCustomerTypes(['Hộ dân', 'Doanh Nghiệp'])
        setChosenWard(event.target.value);
    };

    const handleChangeCustomerType = (event, newCustomerTypes) => {
        setPage(0);
        setChosenCustomerTypes(newCustomerTypes);
    };

    function handleShowWard(ward) {
        if (ward.IDQuanHuyen === chosenDistrict) {
            return (
                <MenuItem value={ward.IDXaPhuong} key={ward.IDXaPhuong}>
                    {ward.TenXaPhuong}
                </MenuItem>
            )
        }
    }

    const handleChangeSearchInput = (event) => {
        setSearchInput(event.target.value)
        setPage(0);
        setChosenCustomerTypes(['Hộ dân', 'Doanh Nghiệp'])
        console.log(searchInput)
    }

    const handleChangeSearchField = (event) => {
        setSearchField(event.target.value);
        console.log(searchField)
    };



    function getFormattedDate(date) {
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        return day + '/' + month + '/' + year;
    }

    //Hàm Xử Lý Hiển Thị Chuyển Trang
    const handleShowTablePagination = function () {
        if (searchInput === "" && chosenDistrict === 0 && chosenWard === 0 && chosenCustomerTypes.length === 0) {
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
        } else {
            return (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={chosenCustomers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            );
        }
    }

    //Hàm Lọc Khách Hàng Theo Điều Kiện
    const handleChosenCustomer = function (customers) {
        var filteredCustomer = customers.filter(function (customer) {
            //Tìm kiếm thao trường
            switch (searchField) {
                //Họ Tên
                case 1: {
                    if (customer.HoTenKH.toLowerCase().includes(searchInput.toLowerCase())) {
                        if (chosenCustomerTypes.includes(customer.TenLoai)) {
                            if (chosenDistrict !== 0) {
                                if (chosenWard !== 0) {
                                    return (
                                        customer.IDQuanHuyen === chosenDistrict,
                                        customer.IDXaPhuong === chosenWard
                                    )
                                } else {
                                    return (
                                        customer.IDQuanHuyen === chosenDistrict
                                    )
                                }
                            } else {
                                return (
                                    true
                                )
                            }
                        }
                    }
                    break
                }
                //Mã Khách Hàng
                case 2: {
                    if (customer.MaKhachHang.toLowerCase().includes(searchInput.toLowerCase())) {
                        if (chosenCustomerTypes.includes(customer.TenLoai)) {
                            if (chosenDistrict !== 0) {
                                if (chosenWard !== 0) {
                                    return (
                                        customer.IDQuanHuyen === chosenDistrict,
                                        customer.IDXaPhuong === chosenWard
                                    )
                                } else {
                                    return (
                                        customer.IDQuanHuyen === chosenDistrict
                                    )
                                }
                            } else {
                                return (
                                    true
                                )
                            }
                        }
                    }
                    break
                }
                //Địa Chỉ
                case 3: {
                    if (customer.DiaChi.toLowerCase().includes(searchInput.toLowerCase())) {
                        if (chosenCustomerTypes.includes(customer.TenLoai)) {
                            if (chosenDistrict !== 0) {
                                if (chosenWard !== 0) {
                                    return (
                                        customer.IDQuanHuyen === chosenDistrict,
                                        customer.IDXaPhuong === chosenWard
                                    )
                                } else {
                                    return (
                                        customer.IDQuanHuyen === chosenDistrict
                                    )
                                }
                            } else {
                                return (
                                    true
                                )
                            }
                        }
                    }
                    break
                }
                //CCCD
                case 4: {
                    if (customer.CCCD.includes(searchInput)) {
                        if (chosenCustomerTypes.includes(customer.TenLoai)) {
                            if (chosenDistrict !== 0) {
                                if (chosenWard !== 0) {
                                    return (
                                        customer.IDQuanHuyen === chosenDistrict,
                                        customer.IDXaPhuong === chosenWard
                                    )
                                } else {
                                    return (
                                        customer.IDQuanHuyen === chosenDistrict
                                    )
                                }
                            } else {
                                return (
                                    true
                                )
                            }
                        }
                    }
                    break
                }
            }
        })
        setChosenCustomer(filteredCustomer)
    }

    //Hàm Hiển Thị Khách Hàng
    const showCustomer = function (Customers) {
        if (Customers.length > 0) {
            return (
                Customers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((customer) => (
                        <StyledTableRow
                            key={customer.IDKhachHang}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell component="th" scope="row" >
                                {customer.MaKhachHang}
                            </StyledTableCell>
                            <StyledTableCell>{customer.HoTenKH}</StyledTableCell>
                            <StyledTableCell>{customer.TenLoai}</StyledTableCell>
                            <StyledTableCell>{customer.CCCD}</StyledTableCell>
                            <StyledTableCell>{customer.DiaChi}</StyledTableCell>
                            <StyledTableCell>{customer.TenXaPhuong}</StyledTableCell>
                            <StyledTableCell>{customer.TenQuanHuyen}</StyledTableCell>
                            <StyledTableCell align='center'>
                                <ButtonGroup variant="text" aria-label="outlined button group">
                                    <CustomerFormView customer={customer}></CustomerFormView>
                                    <CustomerFormEdit customer={customer} handleResetPage={handleResetPage}></CustomerFormEdit>
                                    <CustomerFormDelete customer={customer} handleResetPage={handleResetPage}></CustomerFormDelete>
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
    const showExportCustomer = function (Customers) {
        if (Customers.length > 0) {
            return (
                Customers
                    .map((customer) => (
                        <StyledTableRow
                            key={customer.IDKhachHang}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell>{customer.IDKhachHang}</StyledTableCell>
                            <StyledTableCell component="th" scope="row" >{customer.MaKhachHang}</StyledTableCell>
                            <StyledTableCell>{customer.HoTenKH}</StyledTableCell>
                            <StyledTableCell>{customer.TenLoai}</StyledTableCell>                       
                            <StyledTableCell>{customer.CCCD}'</StyledTableCell>
                            <StyledTableCell>{getFormattedDate(new Date(customer.NgayCap))}</StyledTableCell>
                            <StyledTableCell>{customer.DiaChi}</StyledTableCell>
                            <StyledTableCell>{customer.TenXaPhuong}</StyledTableCell>
                            <StyledTableCell>{customer.TenQuanHuyen}</StyledTableCell>
                            <StyledTableCell>{getFormattedDate(new Date(customer.NgayTao))}</StyledTableCell>
                            {
                                getFormattedDate(new Date(customer.NgayChinhSua)) != '01/01/1970' ?
                                    <StyledTableCell>{getFormattedDate(new Date(customer.NgayChinhSua))}</StyledTableCell>
                                    :
                                    <StyledTableCell>Chưa được chỉnh sửa</StyledTableCell>
                            }
                            {
                                customer.TrangThai === 1 ?
                                    <StyledTableCell>Đang Sử Dụng</StyledTableCell>
                                    :
                                    <StyledTableCell>Tạm Dừng Sử Dụng</StyledTableCell>
                            }
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
                Quản Lý Khách Hàng
            </Typography>
            <Box sx={style}>
                {/* Truong tim kiem */}
                <FormControl sx={{ m: 1, minWidth: 170 }}>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={searchField}
                        onChange={handleChangeSearchField}
                    >
                        <MenuItem value={1}>Họ Tên</MenuItem>
                        <MenuItem value={2}>Mã Khách Hàng</MenuItem>
                        <MenuItem value={3}>Địa Chỉ</MenuItem>
                        <MenuItem value={4}>CCCD</MenuItem>
                    </Select>
                </FormControl>
                {/* TextField tim kiem */}
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
                {/* combobox Quan Huyen */}
                <FormControl sx={{ m: 1, minWidth: 180 }}>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="select-district"
                        value={chosenDistrict}
                        onChange={handleChangeDistrict}
                    >
                        <MenuItem value={0} key={0}>
                            Chọn Quận Huyện
                        </MenuItem>
                        {districts
                            .map((district) => (
                                <MenuItem value={district.IDQuanHuyen} key={district.IDQuanHuyen}>
                                    {district.TenQuanHuyen}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                {/* combobox XaPhuong */}
                <FormControl sx={{ m: 1, minWidth: 180 }}>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="select-ward"
                        value={chosenWard}
                        onChange={handleChangeWard}
                    >
                        <MenuItem value={0} key={0}>
                            Chọn Xã Phường
                        </MenuItem>
                        {wards
                            .map((ward) => (
                                handleShowWard(ward)
                            ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={actionAreaStyle}>
                {/* Toggle CustomerType */}
                <ToggleButtonGroup
                    aria-label="CustomerType"
                    value={chosenCustomerTypes}
                    onChange={handleChangeCustomerType}
                    size='large'

                >
                    {customerTypes
                        .map((customerType) => (
                            <ToggleButton
                                color='primary'
                                value={customerType.TenLoai}
                                aria-label={customerType.IDLoaiKhachHang}
                                key={customerType.IDLoaiKhachHang}
                            >
                                {customerType.TenLoai}
                            </ToggleButton>
                        ))}
                </ToggleButtonGroup>
                <Stack direction="row" spacing={2} alignItems="flex-end" marginBottom={1}>
                    <CustomerFormAdd handleResetPage={handleResetPage}></CustomerFormAdd>
                    <ReactHtmlTableToExcel
                        id="ExportExcelButton"
                        className="btn btn-info"
                        table="customers-export-table"
                        filename="DanhSachKhachHang"
                        sheet="Sheet"
                        buttonText="Xuất file Excel"
                    >
                    </ReactHtmlTableToExcel>
                </Stack>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead color="black">
                        <TableRow>
                            <StyledTableCell style={{ width: '5%' }}>Mã Khách Hàng</StyledTableCell>
                            <StyledTableCell style={{ width: '15%' }}>Tên Khách Hàng</StyledTableCell>
                            <StyledTableCell style={{ width: '15%' }}>Loại Khách Hàng</StyledTableCell>
                            <StyledTableCell style={{ width: '15%' }}>Căn Cước Công Dân</StyledTableCell>
                            <StyledTableCell style={{ width: '20%' }}>Địa Chỉ</StyledTableCell>
                            <StyledTableCell style={{ width: '15%' }}>Xã Phường</StyledTableCell>
                            <StyledTableCell style={{ width: '15%' }}>Quận Huyện</StyledTableCell>
                            <StyledTableCell align='center' style={{ width: '5%' }}>Thao Tác</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Kiểm Tra Có Sử Dụng Trường Tìm Kiếm */}
                        {searchInput !== "" || chosenDistrict !== 0 || chosenWard !== 0 || chosenCustomerTypes.length !== 0 ?
                            showCustomer(chosenCustomers)
                            :
                            showCustomer(customers)
                        }
                    </TableBody>
                </Table>
                {handleShowTablePagination()}
            </TableContainer>
            <TableContainer component={Paper} >
                <Table id="customers-export-table">
                    <TableHead color="black">
                        <TableRow>
                            <StyledTableCell>ID Khách Hàng</StyledTableCell>
                            <StyledTableCell>Mã Khách Hàng</StyledTableCell>
                            <StyledTableCell>Họ Tên Khách Hàng</StyledTableCell>
                            <StyledTableCell>Tên Loại Khách Hàng</StyledTableCell>
                            <StyledTableCell>Căn Cước Công Dân</StyledTableCell>
                            <StyledTableCell>Ngày Cấp CCCD</StyledTableCell>
                            <StyledTableCell>Địa Chỉ</StyledTableCell>
                            <StyledTableCell>Xã Phường</StyledTableCell>
                            <StyledTableCell>Quận Huyện</StyledTableCell>
                            <StyledTableCell>Ngày Tạo Khách Hàng</StyledTableCell>
                            <StyledTableCell>Ngày Chỉnh Sửa Khách Hàng</StyledTableCell>
                            <StyledTableCell>Trạng Thái Khách Hàng</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Kiểm Tra Có Sử Dụng Trường Tìm Kiếm */}
                        {searchInput !== "" || chosenDistrict !== 0 || chosenWard !== 0 || chosenCustomerTypes.length !== 0 ?
                            showExportCustomer(chosenCustomers)
                            :
                            showExportCustomer(customers)
                        }
                    </TableBody>
                </Table>
                {handleShowTablePagination()}
            </TableContainer>
        </div>
    )
}

export default Customer