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
import Divider from '@mui/material/Divider';
import { GetCookie, cookie } from '../Cookie/CookieFunc';
import ExportFileExcel from './ExportFileExcel';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import SnackBarProvider from "../SnackBar/SnackBarProvider";
import CustomerFormRecover from './CustomerFormRecover';

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
    marginLeft: 2,
    color: 'black',
    alignItems: "center",
    justifyContent: "center"
};

const actionAreaStyle = {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
};

GetCookie(document.cookie)

function Customer({ collectCustomer }) {

    const [searchField, setSearchField] = React.useState(1);

    const [searchInput, setSearchInput] = React.useState('');

    const [showTablePagination, setShowTablePagination] = React.useState(true);

    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

    const [disableCustomer, setDisableCustomer] = React.useState(true);

    React.useEffect(() => {
        if (collectCustomer) {
            axios.get(`http://localhost:5199/api/KhachHang/` + cookie)
                .then(res => {
                    const Customers = res.data;
                    setCustomer(Customers);
                })
        } else {
            axios.get(`http://localhost:5199/api/KhachHang`)
                .then(res => {
                    const Customers = res.data;
                    setCustomer(Customers);
                })
        }

    }, [resetPage, statusCustomer, collectCustomer])

    React.useEffect(() => {
        if (collectCustomer) {
            axios.get(`http://localhost:5199/api/QuanHuyen/` + cookie)
                .then(res => {
                    const districts = res.data;
                    setDistricts(districts);
                })
        } else {
            axios.get(`http://localhost:5199/api/QuanHuyen/AvailableDistricts`)
                .then(res => {
                    const districts = res.data;
                    setDistricts(districts);
                })
        }
    }, [collectCustomer])
    React.useEffect(() => {
        if (collectCustomer) {
            axios.get(`http://localhost:5199/api/XaPhuong/getbyidemp/` + cookie)
                .then(res => {
                    const wards = res.data;
                    setWards(wards);
                })
        } else {
            axios.get(`http://localhost:5199/api/XaPhuong/AvailableWards`)
                .then(res => {
                    const wards = res.data;
                    setWards(wards);
                })
        }
    }, [collectCustomer])

    React.useEffect(() => {
        axios.get(`http://localhost:5199/api/LoaiKhachHang`)
            .then(res => {
                const customerTypes = res.data;
                setCustomerTypes(customerTypes);
            })
    }, [])

    React.useEffect(() => {
        handleResetPage()
        setChosenCustomer([])
        setSearchField(1)
        setChosenDistrict(0)
        setChosenWard(0)
        setChosenCustomerTypes([])
        setSearchInput("")
    }, [collectCustomer])

    const handleResetPage = function () {
        setResetPage(!resetPage)
    }

    React.useEffect(() => {
        handleChosenCustomer(customers)
    }, [chosenDistrict, chosenWard, searchInput, searchField, chosenCustomerTypes, disableCustomer, resetPage])

    function removeAccents(str) {
        var AccentsMap = [
            "aàảãáạăằẳẵắặâầẩẫấậ",
            "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
            "dđ", "DĐ",
            "eèẻẽéẹêềểễếệ",
            "EÈẺẼÉẸÊỀỂỄẾỆ",
            "iìỉĩíị",
            "IÌỈĨÍỊ",
            "oòỏõóọôồổỗốộơờởỡớợ",
            "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
            "uùủũúụưừửữứự",
            "UÙỦŨÚỤƯỪỬỮỨỰ",
            "yỳỷỹýỵ",
            "YỲỶỸÝỴ"
        ];
        for (var i = 0; i < AccentsMap.length; i++) {
            var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
            var char = AccentsMap[i][0];
            str = str.replace(re, char);
        }
        return str;
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
        setRowsPerPage(-1);
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

    const handleSelectionDisableCustomer = () => {
        setDisableCustomer(!disableCustomer)
    }

    const handleChangeSearchInput = (event) => {
        setSearchInput(event.target.value)
        setPage(0);
        setRowsPerPage(-1);
        setChosenCustomerTypes(['Hộ dân', 'Doanh Nghiệp'])
    }

    const handleChangeSearchField = (event) => {
        setSearchField(event.target.value);
    };

    //Hàm Xử Lý Hiển Thị Chuyển Trang
    const handleShowTablePagination = function () {
        if (searchInput === "" && chosenDistrict === 0 && chosenWard === 0 && chosenCustomerTypes.length === 0 && disableCustomer) {
            if (showTablePagination)
                return (
                    <TablePagination
                        rowsPerPageOptions={[10, 50, { value: -1, label: 'Tất Cả' }]}
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
                    rowsPerPageOptions={[10, 50, { value: -1, label: 'Tất Cả' }]}
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
    const handleChosenCustomer = function (Customers) {
        var filteredCustomer = Customers.filter(function (customer) {
            //Tìm kiếm thao trường
            switch (searchField) {
                //Họ Tên
                case 1: {
                    if (removeAccents(customer.HoTenKH.toLowerCase()).includes(removeAccents(searchInput.toLowerCase()))) {
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
                                        customer.IDXaPhuong === chosenWard``
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
                    if (removeAccents(customer.DiaChi + " " + customer.TenXaPhuong + " " + customer.TenQuanHuyen).toLowerCase().includes(removeAccents(searchInput.toLowerCase()))) {
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
        if (!disableCustomer) {
            if (searchInput !== "" || chosenDistrict !== 0 || chosenWard !== 0 || chosenCustomerTypes.length !== 0) {
                var filteredStatusCustomer = filteredCustomer.filter(function (customer) {
                    return (
                        customer.TrangThai === 1
                    )
                })
            } else {
                var filteredStatusCustomer = customers.filter(function (customer) {
                    return (
                        customer.TrangThai === 1
                    )
                })
            }
        }
        if (disableCustomer) {
            setChosenCustomer(filteredCustomer)
        } else {
            setChosenCustomer(filteredStatusCustomer)
        }
    }
    //Hàm Hiển Thị Khách Hàng
    const showCustomer = function (Customers) {
        var CustomersPerPage
        if (rowsPerPage === -1) {
            CustomersPerPage = Customers.length
        } else {
            CustomersPerPage = rowsPerPage
        }

        if (Customers.length > 0) {
            return (
                Customers
                    .slice(page * CustomersPerPage, page * CustomersPerPage + CustomersPerPage)
                    .map(function (customer) {
                        return (
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
                                <StyledTableCell>{customer.DiaChi}, {customer.TenXaPhuong}, {customer.TenQuanHuyen}</StyledTableCell>
                                {customer.TrangThai === 1 ?
                                    <StyledTableCell sx={{ color: "var(--color2)" }}>Đang Sử Dụng</StyledTableCell>
                                    :
                                    <StyledTableCell style={{ color: "var(--color9)" }}>Tạm Dừng Sử Dụng</StyledTableCell>
                                }
                                <StyledTableCell align='center'>
                                    <ButtonGroup variant="text" aria-label="outlined button group">
                                        <CustomerFormView customer={customer}></CustomerFormView>
                                        <CustomerFormEdit customer={customer} handleResetPage={handleResetPage} importdistricts={districts} importwards={wards}></CustomerFormEdit>
                                        {customer.TrangThai == 1 ?
                                            <CustomerFormDelete customer={customer} handleResetPage={handleResetPage}></CustomerFormDelete>
                                            :
                                            <CustomerFormRecover customer={customer} handleResetPage={handleResetPage}></CustomerFormRecover>
                                        }

                                    </ButtonGroup>
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                    })
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
            {collectCustomer ?
                <Typography variant="p"
                    sx={
                        {
                            fontSize: 30,
                            color: "var(--color2)",
                            fontWeight: "bold",
                        }
                    }
                >
                    Quản Lý Khách Hàng Theo Tuyến Thu
                </Typography>
                :
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
            }

            <Divider sx={{ marginBottom: 3 }}></Divider>
            <Box sx={style}>
                {/* Truong tim kiem */}
                <FormControl sx={{ m: 1, minWidth: 170 }}>
                    <InputLabel htmlFor="outlined-adornment-search">Danh Mục</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={searchField}
                        label="Danh Mục"
                        onChange={handleChangeSearchField}
                    >
                        <MenuItem value={1}>Họ Tên</MenuItem>
                        <MenuItem value={2}>Mã Khách Hàng</MenuItem>
                        <MenuItem value={3}>Địa Chỉ</MenuItem>
                        <MenuItem value={4}>CCCD</MenuItem>
                    </Select>
                </FormControl>
                {/* TextField tim kiem */}
                <FormControl sx={{ m: 1, width: '60ch' }}>
                    <InputLabel htmlFor="outlined-adornment-search">Tìm Kiếm</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-search"
                        type="text"
                        label="Tìm Kiếm"
                        onChange={handleChangeSearchInput}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="button search"
                                    edge="end"
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {/* combobox Quan Huyen */}
                <FormControl sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel htmlFor="outlined-adornment-search">Quận Huyện</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="select-district"
                        label="Quận Huyện "
                        value={chosenDistrict}
                        onChange={handleChangeDistrict}
                    >
                        <MenuItem value={0} key={0}>
                            Tất Cả
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
                    <InputLabel htmlFor="outlined-adornment-search">Xã Phường</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="select-ward"
                        label="Xã Phường "
                        value={chosenWard}
                        onChange={handleChangeWard}
                    >
                        <MenuItem value={0} key={0}>
                            Tất Cả
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
                <Stack direction="row" spacing={2} alignItems="flex-end">
                    <ToggleButtonGroup
                        aria-label="CustomerType"
                        value={chosenCustomerTypes}
                        onChange={handleChangeCustomerType}
                    >
                        {customerTypes
                            .map((customerType) => (
                                <ToggleButton
                                    color='primary'
                                    value={customerType.TenLoai}
                                    aria-label={customerType.IDLoaiKhachHang}
                                    key={customerType.IDLoaiKhachHang}
                                    sx={{
                                        border: 0,
                                        fontWeight: "bold",
                                        borderRadius: 2,
                                        backgroundColor: "var(--color1)",
                                        maxHeight: 50,
                                    }}

                                >
                                    {customerType.TenLoai}
                                </ToggleButton>
                            ))}
                    </ToggleButtonGroup>
                    <FormControlLabel control={<Checkbox defaultChecked onClick={handleSelectionDisableCustomer} />} label="Hiển Thị Thêm Khách Hàng Ngừng Sử Dụng" />
                </Stack>
                <Stack direction="row" spacing={2} alignItems="flex-end" marginBottom={2} marginTop={2}>
                    <CustomerFormAdd handleResetPage={handleResetPage} importdistricts={districts} importwards={wards}></CustomerFormAdd>
                    {searchInput !== "" || chosenDistrict !== 0 || chosenWard !== 0 || chosenCustomerTypes.length !== 0 || !disableCustomer && chosenCustomers.length !== 0 ?
                        <ExportFileExcel customers={chosenCustomers} handleResetPage={handleResetPage} />
                        :
                        <ExportFileExcel customers={customers} handleResetPage={handleResetPage} />
                    }
                </Stack>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead color="black">
                        <TableRow>
                            <StyledTableCell style={{ width: '12%' }}>Mã Khách Hàng</StyledTableCell>
                            <StyledTableCell style={{ width: '15%' }}>Tên Khách Hàng</StyledTableCell>
                            <StyledTableCell style={{ width: '12%' }}>Loại Khách Hàng</StyledTableCell>
                            <StyledTableCell style={{ width: '11%' }}>CCCD</StyledTableCell>
                            <StyledTableCell style={{ width: '30%' }}>Địa Chỉ</StyledTableCell>
                            <StyledTableCell style={{ width: '15%' }}>Trạng Thái</StyledTableCell>
                            <StyledTableCell align='center' style={{ width: '5%' }}>Thao Tác</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Kiểm Tra Có Sử Dụng Trường Tìm Kiếm */}
                        {searchInput !== "" || chosenDistrict !== 0 || chosenWard !== 0 || chosenCustomerTypes.length !== 0 || !disableCustomer && chosenCustomers.length !== 0 ?
                            showCustomer(chosenCustomers)
                            :
                            showCustomer(customers)
                        }
                    </TableBody>
                </Table>
                {handleShowTablePagination()}
            </TableContainer>
        </div>
    )
}

export default Customer