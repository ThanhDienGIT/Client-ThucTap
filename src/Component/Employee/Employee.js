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
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
    const [employees, setEmployees] = React.useState([]);
    //Navigate
    let navigate = useNavigate();
    //Modal const
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //Add Employee Form
    const [email, setEmail] = React.useState('');
    const [tennhanvien, setTenNhanVien] = React.useState('');
    const [sdt, setSdt] = React.useState('');
    const [diachi, setDiaChi] = React.useState('');
    const [cccd, setCCCD] = React.useState('');
    var [ngaysinh, setNgaySinh] = React.useState(null);
    const [gioiTinh, setGioiTinh] = React.useState('Nam');

    const [emailError, setEmailError] = React.useState(false);
    const [tennhanvienError, setTenNhanVienError] = React.useState(false);
    const [sdtError, setSdtError] = React.useState(false);
    const [diachiError, setDiaChiError] = React.useState(false);
    const [cccdError, setCCCDError] = React.useState(false);
    //Search Bar
    const [searchCategory, setSearchCategory] = React.useState('');
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearch = (e) => {

    }


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

        if(email === '' || !validateEmail(email)) {
            setEmailError(true);
        }

        if(tennhanvien === '') {
            setTenNhanVienError(true);
        }

        if(sdt === '') {
            setSdtError(true);
        }

        if(diachi === '') {
            setDiaChiError(true);
        }

        if(cccd === '') {
            setCCCDError(true);
        }

        if(ngaysinh == null) {
            setNgaySinh('');
        }

        const today = new Date().getFullYear();
        if(ngaysinh){
            console.log(today - ngaysinh.getFullYear());
            if(ngaysinh!=null && (today - ngaysinh.getFullYear() < 18)){
                setNgaySinh('');
            }
        }
        
        if(email && tennhanvien && sdt && diachi && cccd && ngaysinh!=null && !(today - ngaysinh.getFullYear() < 18) && validateEmail(email)) {
            setOpen(false);
            ngaysinh = ngaysinh.toLocaleDateString();
            //create new MaNhanVien
            var lastMaNhanVien = employees[employees.length-1].MaNhanVien;
            var newMaNhanVien = parseInt(lastMaNhanVien.substring(2));
            newMaNhanVien = newMaNhanVien+1;
            newMaNhanVien = newMaNhanVien.toString().padStart(4, '0');
            newMaNhanVien = 'NV' + newMaNhanVien;
            //create taikhoan
            var taikhoan = email.substring(0, email.lastIndexOf('@'));
            //hash default Matkhau
            var md5 = require('md5');
            var matkhau = md5('shizen123');
            //default profile picture
            var profilePicture = 'anonymous.png';
            console.log(JSON.stringify({
                MaNhanVien: newMaNhanVien,
                HoTen: tennhanvien,
                Email: email,
                GioiTinh: gioiTinh,
                SoDienThoai: sdt,
                NgaySinh: ngaysinh,
                DiaChi: diachi,
                CCCD: cccd,
                ProfilePicture: profilePicture,
                TaiKhoan: taikhoan,
                MatKhau: matkhau
                }) );
            
            fetch('http://localhost:5199/api/nhanvien',{
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                   MaNhanVien: newMaNhanVien,
                    HoTen: tennhanvien,
                    Email: email,
                    GioiTinh: gioiTinh,
                    SoDienThoai: sdt,
                    NgaySinh: ngaysinh,
                    DiaChi: diachi,
                    CCCD: cccd,
                    ProfilePicture: profilePicture,
                    TaiKhoan: taikhoan,
                    MatKhau: matkhau
                })
            });
            setNgaySinh(null);
            window.location.reload(); 
        }
    };

    React.useEffect( () => {
        fetch('http://localhost:5199/api/nhanvien')
            .then(res => res.json())
            .then(data => setEmployees(data))
    }, []);

    return (
        /*
        <div>
            {employees.map(employee => (
                <p key={ employee.IDNhanVien }>{ employee.HoTen }</p>
            ))}
        </div>
        */
        <div>
            <Typography 
                variant="h4" 
                component="h1" 
                color="initial" 
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
                            value={'HoTen'}
                            label="Danh Mục"
                            onChange={(event) => {
                                setSearchCategory(event.target.value)
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
                            setSearchTerm(event.target.value);
                        }} 
                        EndIco
                        sx={{ width: '70%' }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button 
                            variant="contained" 
                            color="primary" 
                            size="large" 
                            startIcon={< AddCircleOutlineIcon />}
                            onClick={handleOpen}
                        >
                        Thêm Nhân Viên
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
                            onChange={(e) => setTenNhanVien(e.target.value)}
                            label="Tên Nhân Viên"
                            variant="outlined"
                            fullWidth
                            required 
                            error={tennhanvienError}
                        />
                        <TextField
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email" 
                            variant="outlined" 
                            display="block"
                            fullWidth 
                            required 
                            error={emailError}
                        />
                        <TextField
                            onChange={(e) => setSdt(e.target.value)}
                            label="Số Điện Thoại" 
                            variant="outlined" 
                            display="block"
                            fullWidth 
                            required 
                            error={sdtError}
                        />
                        <TextField
                            onChange={(e) => setDiaChi(e.target.value)}
                            label="Địa Chỉ" 
                            variant="outlined" 
                            display="block"
                            fullWidth 
                            required 
                            error={diachiError}
                        />
                        <TextField
                            onChange={(e) => setCCCD(e.target.value)}
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
                                value={ngaysinh} 

                                onChange={(newNgaySinh) => {
                                    setNgaySinh(newNgaySinh);
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
                            <RadioGroup value={gioiTinh} onChange={(e) => setGioiTinh(e.target.value)}>
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
                            <StyledTableCell align="center">Tên Nhân Viên</StyledTableCell>
                            <StyledTableCell align="center">Chức vụ</StyledTableCell>
                            <StyledTableCell align="center">Số Điện Thoại</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Giới Tính</StyledTableCell>
                            <StyledTableCell align="center">Ngày Sinh</StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.filter((val) => {
                            if (searchTerm == '') {
                                return val;
                            }else
                            if (searchCategory === 'HoTen' &&  val.HoTen.toLowerCase().includes(searchTerm.toLowerCase())){
                                return val;
                            }else
                            if (searchCategory === 'MaNhanVien' &&  val.MaNhanVien.toLowerCase().includes(searchTerm.toLowerCase())){
                                return val;
                            }else
                            if (searchCategory === 'Email' &&  val.Email.toLowerCase().includes(searchTerm.toLowerCase())){
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
                                <StyledTableCell align="left"></StyledTableCell>
                                <StyledTableCell align="right">{employee.SoDienThoai}</StyledTableCell>
                                <StyledTableCell align="left">{employee.Email}</StyledTableCell>
                                <StyledTableCell align="left">{employee.GioiTinh}</StyledTableCell>
                                <StyledTableCell align="right">{new Date(employee.NgaySinh).toLocaleDateString()}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <ButtonGroup variant="text" color="primary" aria-label="">
                                        <Button variant="text" color="primary" startIcon={< VisibilityIcon />} sx={{ paddingLeft: 2.5}}></Button>
                                        <Button variant="text" color="primary" startIcon={< EditIcon />} sx={{ paddingLeft: 2.5}}></Button>
                                        <Button onClick={(e) => deleteEmp(employee.IDNhanVien)} variant="text" color="primary" startIcon={< DeleteForeverIcon />} sx={{ paddingLeft: 2.5}}></Button>
                                    </ButtonGroup>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    </div>
    )
}