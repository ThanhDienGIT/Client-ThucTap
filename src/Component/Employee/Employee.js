import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
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
    }, [])

    return (
        /*
        <div>
            {employees.map(employee => (
                <p key={ employee.IDNhanVien }>{ employee.HoTen }</p>
            ))}
        </div>
        */
        <div>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleOpen}
            >
                Thêm Nhân Viên
            </Button>
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
                variant="h4" 
                component="h2" 
                color="initial" 
                sx={{ margin : 2 }}
            >
                Danh Sách Nhân Viên
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Mã Nhân Viên</TableCell>
                            <TableCell align="center">Tên Nhân Viên</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Giới Tính</TableCell>
                            <TableCell align="center">Số Điện Thoại</TableCell>
                            <TableCell align="center">Ngày Sinh</TableCell>
                            <TableCell align="center">Địa Chỉ</TableCell>
                            <TableCell align="center">CCCD</TableCell>
                            <TableCell align="center">Tài Khoản</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow
                                key={employee.IDNhanVien}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {employee.MaNhanVien}
                                </TableCell>
                                <TableCell align="left">{employee.HoTen}</TableCell>
                                <TableCell align="left">{employee.Email}</TableCell>
                                <TableCell align="left">{employee.GioiTinh}</TableCell>
                                <TableCell align="right">{employee.SoDienThoai}</TableCell>
                                <TableCell align="left">{new Date(employee.NgaySinh).toLocaleDateString()}</TableCell>
                                <TableCell align="left">{employee.DiaChi}</TableCell>
                                <TableCell align="right">{employee.CCCD}</TableCell>
                                <TableCell align="left">{employee.TaiKhoan}</TableCell>
                                <TableCell align="center">
                                    <ButtonGroup variant="text" color="primary" aria-label="">
                                        <Button variant="text" color="primary">Sửa</Button>
                                        <Button variant="text" color="primary">Xóa</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    </div>
    )
}