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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

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

export default function Employee() {
    const [employees, setEmployees] = React.useState([]);

    //Modal const
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Add Employee Form
    const [manhanvien, setMaNhanVien] = React.useState('');
    const [tennhanvien, setTenNhanVien] = React.useState('');

    const [manhanvienError, setMaNhanVienError] = React.useState(false);
    const [tennhanvienError, setTenNhanVienError] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setMaNhanVienError(false);
        setTenNhanVienError(false);

        if(manhanvien === '') {
            setMaNhanVienError(true);
        }

        if(tennhanvien === '') {
            setTenNhanVienError(true);
        }

        if(manhanvien && tennhanvien) {
            setOpen(false);
            console.log(manhanvien, tennhanvien);
        }
    }

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
            <Grid container spacing={12}>
              <Grid item xs={8}>
                <TextField 
                    id="outlined-search" 
                    label="Tìm kiếm" 
                    type="search" 
                    sx={{ width: '70%' }}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    onClick={handleOpen} 
                    startIcon={<SearchIcon />}
                    sx={{ margin: 0.5, marginLeft: 2 }}
                >
                    Tìm Kiếm
                </Button>
              </Grid>
              <Grid item xs={4}>
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
                            onChange={(e) => setMaNhanVien(e.target.value)}
                            label="Mã Nhân Viên" 
                            variant="outlined" 
                            display="block"
                            fullWidth 
                            required 
                            error={manhanvienError}
                        />
                        <TextField
                            onChange={(e) => setTenNhanVien(e.target.value)}
                            label="Tên Nhân Viên"
                            variant="outlined"
                            fullWidth
                            required 
                            error={tennhanvienError}
                        />
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
                        {employees.map((employee) => (
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
                                <StyledTableCell align="left">{new Date(employee.NgaySinh).toLocaleDateString()}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <ButtonGroup variant="text" color="primary" aria-label="">
                                        <Button variant="text" color="primary" startIcon={< VisibilityIcon />} sx={{ paddingLeft: 2.5}}></Button>
                                        <Button variant="text" color="primary" startIcon={< EditIcon />} sx={{ paddingLeft: 2.5}}></Button>
                                        <Button variant="text" color="primary" startIcon={< DeleteOutlineIcon />} sx={{ paddingLeft: 2.5}}></Button>
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