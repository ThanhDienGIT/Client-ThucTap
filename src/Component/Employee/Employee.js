import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FormControl, FormControlLabel, FormLabel } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

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

// Modal Form Style (Form Thêm Nhân Viên, ...)
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function validateEmail(email){
    var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return EMAIL_REGEX.test(email);
}

export default function Employee() {
    //API input data
    const [employees, setEmployees] = React.useState([]);
    const [empRoles, setEmpRoles] = React.useState([]);
    const [roles, setRoles] = React.useState([]);
    //Navigate
    let navigate = useNavigate();
    //Modal const
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //Add Employee Form
    /*
    const [email, setEmail] = React.useState('');
    const [tennhanvien, setTenNhanVien] = React.useState('');
    const [sdt, setSdt] = React.useState('');
    const [diachi, setDiaChi] = React.useState('');
    const [cccd, setCCCD] = React.useState('');
    const [gioiTinh, setGioiTinh] = React.useState('Nam');
    */
    const [addEmp, setAddEmp] = React.useState({
        email: '',
        tennhanvien: '',
        sdt: '',
        diachi: '',
        cccd: '',
        gioiTinh: 'Nam',
        ngaysinh: null
    });

    //var [ngaysinh, setNgaySinh] = React.useState(null);
    //Add Employee Form Handle Error
    const [emailError, setEmailError] = React.useState(false);
    const [tennhanvienError, setTenNhanVienError] = React.useState(false);
    const [sdtError, setSdtError] = React.useState(false);
    const [diachiError, setDiaChiError] = React.useState(false);
    const [cccdError, setCCCDError] = React.useState(false);
    /*
    const [handleError, setHandleError] = React.useState({
        emailError: false,
        tennhanvienError: false,
        sdtError: false,
        diachiError: false,
        cccdError: false
    });
    */
    //Search Bar
    /*
    const [searchCategory, setSearchCategory] = React.useState('HoTen');
    const [searchTerm, setSearchTerm] = React.useState('');
    */
    const [searchHandle, setSearchHandle] = React.useState({
        searchCategory: 'HoTen',
        searchTerm: ''
    });

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employees.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    


    function deleteEmp(id) {
        //console.log('http://localhost:5199/api/nhanvien/' + id);
        fetch('http://localhost:5199/api/nhanvien/' + id, {
            method: 'DELETE'
        }).then(() =>{
            navigate(0);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setEmailError(false);
        setTenNhanVienError(false);
        setSdtError(false);
        setDiaChiError(false);
        setCCCDError(false);
        
        /*
        setHandleError({...handleError, 
            emailError: false,
            tennhanvienError : false,
            sdtError: false,
            diachiError : false,
            cccdError : false
        });
        */
        
        if(addEmp.email === '' || !validateEmail(addEmp.email)) {
            setEmailError(true);
            //setHandleError({ ...handleError, emailError: true })
        }

        if(addEmp.tennhanvien === '') {
            setTenNhanVienError(true);
            //setHandleError({ ...handleError, tennhanvienError: true })
        }

        if(addEmp.sdt === '' || isNaN(+addEmp.sdt)) {
            setSdtError(true);
            //setHandleError({ ...handleError, sdtError: true })
        }

        if(addEmp.diachi === '') {
            setDiaChiError(true);
            //setHandleError({ ...handleError, diachiError: true })
        }

        if(addEmp.cccd === '') {
            setCCCDError(true);
            //setHandleError({ ...handleError, cccdError: true })
        }

        if(addEmp.ngaysinh == null) {
            //setNgaySinh('');
            setAddEmp({...addEmp, ngaysinh: '' });
        }

        const today = new Date().getFullYear();
        if(addEmp.ngaysinh){
            console.log(today - addEmp.ngaysinh.getFullYear());
            if(addEmp.ngaysinh!=null && (today - addEmp.ngaysinh.getFullYear() < 18)){
                //setNgaySinh('');
                setAddEmp({...addEmp, ngaysinh: '' });
            }
        }
        
        //if(email && tennhanvien && sdt && diachi && cccd && ngaysinh!=null && !(today - ngaysinh.getFullYear() < 18) && validateEmail(email)) {
        if(!emailError && !tennhanvienError && !sdtError && !diachiError && !cccdError && addEmp.ngaysinh!=null && !(today - addEmp.ngaysinh.getFullYear() < 18) && !emailError) {
            setOpen(false);
            addEmp.ngaysinh = addEmp.ngaysinh.toLocaleDateString();
            //create new MaNhanVien
            var lastMaNhanVien = employees[employees.length-1].MaNhanVien;
            var newMaNhanVien = parseInt(lastMaNhanVien.substring(2));
            newMaNhanVien = newMaNhanVien+1;
            newMaNhanVien = newMaNhanVien.toString().padStart(4, '0');
            newMaNhanVien = 'NV' + newMaNhanVien;
            //create taikhoan
            var taikhoan = addEmp.email.substring(0, addEmp.email.lastIndexOf('@'));
            //hash default Matkhau
            var md5 = require('md5');
            var matkhau = md5('shizen123');
            //default profile picture
            var profilePicture = 'anonymous.png';
            /*
            console.log(JSON.stringify({
                MaNhanVien: newMaNhanVien,
                HoTen: addEmp.tennhanvien,
                Email: addEmp.email,
                GioiTinh: addEmp.gioiTinh,
                SoDienThoai: addEmp.sdt,
                NgaySinh: addEmp.ngaysinh,
                DiaChi:addEmp. diachi,
                CCCD: addEmp.cccd,
                ProfilePicture: profilePicture,
                TaiKhoan: taikhoan,
                MatKhau: matkhau
                }) );
            */
            fetch('http://localhost:5199/api/nhanvien',{
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    MaNhanVien: newMaNhanVien,
                    HoTen: addEmp.tennhanvien,
                    Email: addEmp.email,
                    GioiTinh: addEmp.gioiTinh,
                    SoDienThoai: addEmp.sdt,
                    NgaySinh: addEmp.ngaysinh,
                    DiaChi: addEmp.diachi,
                    CCCD: addEmp.cccd,
                    ProfilePicture: profilePicture,
                    TaiKhoan: taikhoan,
                    MatKhau: matkhau
                })
            });
            //setNgaySinh(null);
            setAddEmp({...addEmp, ngaysinh: null });
            navigate(0);
        }
    };

    React.useEffect( () => {
        fetch('http://localhost:5199/api/nhanvien')
            .then(res => res.json())
            .then(data => setEmployees(data))
        fetch('http://localhost:5199/api/phanquyen')
            .then(res => res.json())
            .then(data => setEmpRoles(data))
        fetch('http://localhost:5199/api/quyen')
            .then(res => res.json())
            .then(data => setRoles(data))
    }, []);
    
    function getQuyenByIDNhanVien (idNV, empRoles, roles) {
        let quyenNV;
        let tenQuyenNV = '';
        if (empRoles.filter(e => e.IDNhanVien === idNV)) {
            quyenNV = empRoles.filter(e => e.IDNhanVien === idNV).map(empRole => empRole.IDQuyen);
        }

        tenQuyenNV += roles.filter(e => e.IDQuyen === quyenNV[0]).map(role => role.TenQuyen);
        for(let i=1; i<quyenNV.length; i++) {
            if (roles.filter(e => e.IDQuyen === quyenNV[i])) {
                tenQuyenNV += ' | ';
                tenQuyenNV += roles.filter(e => e.IDQuyen === quyenNV[i]).map(role => role.TenQuyen);
            }
        }
        return tenQuyenNV;
    }
    //console.log(roles);
    
    //console.log(getQuyenByIDNhanVien(1, empRoles, roles));
    return (
        /*
        <div>
            {employees.map(employee => (
                <p key={ employee.IDNhanVien }>{ employee.HoTen }</p>
            ))}
        </div>
        */
        <div>
            <Typography variant="p"
                sx={
                    {
                        fontSize: 30,
                        color: "var(--color2)",
                        fontWeight: "bold"
                    }
                }
            >
                Quản Lý Nhân Viên
            </Typography>
            <Divider sx={{ marginBottom : 3 }}></Divider>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Danh Mục</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={searchHandle.searchCategory}
                            label="Danh Mục"
                            onChange={(event) => {
                                setSearchHandle({ ...searchHandle, searchCategory: event.target.value })
                            }}
                        >
                            <MenuItem value={'HoTen'}>Họ Tên</MenuItem>
                            <MenuItem value={'MaNhanVien'}>Mã Nhân Viên</MenuItem>
                            <MenuItem value={'Email'}>Email</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={7}>
                    <TextField 
                        id="outlined-search" 
                        label="Tìm kiếm" 
                        type="search" 
                        onChange={(event) => {
                            setSearchHandle({ ...searchHandle, searchTerm: event.target.value })
                        }} 
                        sx={{ width: '70%' }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button 
                            variant="contained" 
                            size="large"    
                            sx={{ color : "var(--color7) "}}
                            onClick={handleOpen}
                        >
                            <Typography variant="p"
                                sx={
                                    {
                                        color: "var(--color1)",
                                    }
                                }
                            >Thêm Nhân Viên</Typography>
                    </Button>
                </Grid>
            </Grid>
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Thêm Nhân Viên
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Box
                        component="form" 
                        sx={{
                            '& > :not(style)': { m: 1 },
                          }} 
                        noValidate
                        autoComplete="off" 
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            onChange={(e) => setAddEmp({...addEmp, tennhanvien: e.target.value})}
                            label="Tên Nhân Viên"
                            variant="outlined"
                            fullWidth
                            required 
                            error={tennhanvienError}
                        />
                        <TextField
                            onChange={(e) => setAddEmp({...addEmp, email: e.target.value})}
                            label="Email" 
                            variant="outlined" 
                            display="block"
                            fullWidth 
                            required 
                            error={emailError}
                        />
                        <TextField
                            onChange={(e) => setAddEmp({...addEmp, sdt: e.target.value})}
                            label="Số Điện Thoại" 
                            variant="outlined" 
                            display="block"
                            fullWidth 
                            required 
                            error={sdtError}
                        />
                        <TextField
                            onChange={(e) => setAddEmp({...addEmp, diachi: e.target.value})}
                            label="Địa Chỉ" 
                            variant="outlined" 
                            display="block"
                            fullWidth 
                            required 
                            error={diachiError}
                        />
                        <TextField
                            onChange={(e) => setAddEmp({...addEmp, cccd: e.target.value})}
                            label="Căn Cước Công Dân" 
                            variant="outlined" 
                            display="block"
                            fullWidth 
                            required 
                            error={cccdError}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Ngày Sinh"
                                value={addEmp.ngaysinh} 

                                onChange={(newNgaySinh) => {
                                    setAddEmp({...addEmp, ngaysinh: newNgaySinh });
                                }}
                                renderInput={(params) => 
                                    <TextField 
                                        fullWidth 
                                        required 
                                        {...params} 
                                    />}
                            />
                        </LocalizationProvider>
                        <FormControl sx={{display: 'block'}}>
                            <FormLabel>Giới Tính</FormLabel>
                            <RadioGroup value={addEmp.gioiTinh} onChange={(e) => setAddEmp({...addEmp, gioiTinh: e.target.value})}>
                                <Grid container spacing={2}>
                                <Grid item>
                                    <FormControlLabel value="Nam" control={<Radio></Radio>} label="Nam"/>
                                </Grid>
                                <Grid item>
                                <FormControlLabel value="Nữ" control={<Radio></Radio>} label="Nữ"/>
                                </Grid>
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"  
                        >
                          Submit
                        </Button>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleClose} 
                        >
                            Cancel
                        </Button>
                    </Box>
                </Typography>
            </Box>
            </Modal>
            <Typography 
                variant="h5" 
                component="h2" 
                color="initial" 
                sx={{ margin : 2 }}
            >
                Danh Sách Nhân Viên
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow >
                            <StyledTableCell>Mã Nhân Viên</StyledTableCell>
                            <StyledTableCell align="left">Tên Nhân Viên</StyledTableCell>
                            <StyledTableCell align="center">Chức vụ</StyledTableCell>
                            <StyledTableCell align="center">SĐT</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Giới Tính</StyledTableCell>
                            <StyledTableCell align="center">Ngày Sinh</StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : employees
                          ).filter((val) => {
                            if (searchHandle.searchTerm == '') {
                                return val;
                            }else
                            if (searchHandle.searchCategory === 'HoTen' &&  val.HoTen.toLowerCase().includes(searchHandle.searchTerm.toLowerCase())){
                                return val;
                            }else
                            if (searchHandle.searchCategory === 'MaNhanVien' &&  val.MaNhanVien.toLowerCase().includes(searchHandle.searchTerm.toLowerCase())){
                                return val;
                            }else
                            if (searchHandle.searchCategory === 'Email' &&  val.Email.toLowerCase().includes(searchHandle.searchTerm.toLowerCase())){
                                return val;
                            }
                        }).map((employee) => (
                            <StyledTableRow
                                key={employee.IDNhanVien}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {employee.MaNhanVien}
                                </StyledTableCell>
                                <StyledTableCell align="left">{employee.HoTen}</StyledTableCell>
                                <StyledTableCell align="left">{getQuyenByIDNhanVien(employee.IDNhanVien, empRoles, roles)}</StyledTableCell>
                                <StyledTableCell align="center">{employee.SoDienThoai}</StyledTableCell>
                                <StyledTableCell align="left">{employee.Email}</StyledTableCell>
                                <StyledTableCell align="left">{employee.GioiTinh}</StyledTableCell>
                                <StyledTableCell align="right">{new Date(employee.NgaySinh).toLocaleDateString("es-CL")}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <ButtonGroup variant="text" color="primary" aria-label="">
                                        <Button variant="text" color="primary" startIcon={< VisibilityIcon />} sx={{ paddingLeft: 2.5, color : "var(--color7)" }}></Button>
                                        <Button variant="text" color="primary" startIcon={< EditIcon />} sx={{ paddingLeft: 2.5, color : "var(--color8)"}}></Button>
                                        <Button onClick={(e) => deleteEmp(employee.IDNhanVien)} variant="text" color="primary" startIcon={< DeleteForeverIcon />} sx={{ paddingLeft: 2.5, color : "var(--color9)"}}></Button>
                                    </ButtonGroup>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                            rowsPerPageOptions={[10, 15, 30, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={employees.length}
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
    </div>
    )
}