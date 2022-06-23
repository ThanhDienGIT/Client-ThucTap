import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { FormControl, TextField, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import { wait } from '@testing-library/user-event/dist/utils';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const Info__style = {
    display: 'flex',
    width: 400,
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginLeft: 2,
    color: 'black'
};

const AddForm__style = {
    display: 'flex',
};
export default function EmployeeFormEdit({ employee, empRoles, handleResetPage}) {
    const [addEmp, setAddEmp] = React.useState({
        idnhanvien: employee.IDNhanVien,
        email: employee.Email,
        manhanvien: employee.MaNhanVien,
        tennhanvien: employee.HoTen,
        sdt: employee.SoDienThoai,
        diachi: employee.DiaChi,
        cccd: employee.CCCD,
        gioiTinh: employee.GioiTinh,
        profilepicture: employee.ProfilePicture,
        taikhoan: employee.TaiKhoan,
        matkhau: employee.MatKhau,
        ngaysinh: employee.NgaySinh
    });

    const [emailError, setEmailError] = React.useState(false);
    const [tennhanvienError, setTenNhanVienError] = React.useState(false);
    const [sdtError, setSdtError] = React.useState(false);
    const [diachiError, setDiaChiError] = React.useState(false);
    const [cccdError, setCCCDError] = React.useState(false);

    const [addEmpRoles, setAddEmpRoles] = React.useState([]);



    const getValue = (e, empCurrentRoles) =>{
        let data = addEmpRoles;
        //console.log(empCurrentRoles);
        if(addEmpRoles.length == 0 && empCurrentRoles.length > 0){
            for(var i = 0; i<empCurrentRoles.length; i++){
                data.push(empCurrentRoles[i].toString());
                setAddEmpRoles(data);
            }
        }
        //console.log(data[data.indexOf(e.target.value, data)]);
        /*
        console.log("before:");
        console.log(addEmpRoles);
        console.log(addEmpRoles.includes(e.target.value));
        */
        if(addEmpRoles.includes(e.target.value)){
            addEmpRoles.splice(addEmpRoles.indexOf(e.target.value), 1);
        }else{
            data.push(e.target.value);
            setAddEmpRoles(data);
        }
        /*
        if(!addEmpRoles.includes(e.target.value)){
            data.push(e.target.value);
            setAddEmpRoles(data);
        }else{
            data.pop(e.target.value);
            setAddEmpRoles(data);
        }*/
        //console.log(!addEmpRoles.includes(e.target.value))
        /*
        console.log("after:");
        console.log(addEmpRoles);
        */
    }

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    function validateEmail(email){
        var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return EMAIL_REGEX.test(email);
    }

    async function deleteEmp(id) {
        //console.log('http://localhost:5199/api/nhanvien/' + id);
        await fetch('http://localhost:5199/api/nhanvien/' + id, {
            method: 'DELETE'
        }).then(console.log)
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
        const ngaySinh = new Date(addEmp.ngaysinh);
        //console.log(ngaySinh.getFullYear());
        if(ngaySinh){
            //console.log(today - ngaySinh.getFullYear());
            if(ngaySinh!=null && (today - ngaySinh.getFullYear() < 18)){
                //setNgaySinh('');
                setAddEmp({...addEmp, ngaysinh: '' });
            }
        }
        
        //if(email && tennhanvien && sdt && diachi && cccd && ngaysinh!=null && !(today - ngaysinh.getFullYear() < 18) && validateEmail(email)) {
        if(!emailError && !tennhanvienError && !sdtError && !diachiError && !cccdError && ngaySinh!=null && !(today - ngaySinh.getFullYear() < 18) && !emailError) {
            setOpen(false);
            deleteEmp(addEmp.idnhanvien);
            addEmp.ngaysinh = ngaySinh.toLocaleDateString();
            /*
            console.log(JSON.stringify({
                    IDNhanVien: addEmp.idnhanvien,
                    MaNhanVien: addEmp.manhanvien,
                    HoTen: addEmp.tennhanvien,
                    Email: addEmp.email,
                    GioiTinh: addEmp.gioiTinh,
                    SoDienThoai: addEmp.sdt,
                    NgaySinh: addEmp.ngaysinh,
                    DiaChi: addEmp.diachi,
                    CCCD: addEmp.cccd,
                    ProfilePicture: addEmp.profilepicture,
                    TaiKhoan: addEmp.taikhoan,
                    MatKhau: addEmp.matkhau
                }) );
            */
            fetch('http://localhost:5199/api/nhanvien',{
                method: 'PUT',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    IDNhanVien: addEmp.idnhanvien,
                    MaNhanVien: addEmp.manhanvien,
                    HoTen: addEmp.tennhanvien,
                    Email: addEmp.email,
                    GioiTinh: addEmp.gioiTinh,
                    SoDienThoai: addEmp.sdt,
                    NgaySinh: addEmp.ngaysinh,
                    DiaChi: addEmp.diachi,
                    CCCD: addEmp.cccd,
                    ProfilePicture: addEmp.profilepicture,
                    TaiKhoan: addEmp.taikhoan,
                    MatKhau: addEmp.matkhau
                })
            });

            if(addEmpRoles.length > 0) {
                /*
                console.log('idnhanvien: '+addEmp.idnhanvien);
                */
                for(var i=0; i < addEmpRoles.length; i++){
                    /*
                    console.log(
                        JSON.stringify({
                            IDNhanVien: addEmp.idnhanvien,
                            IDQuyen: addEmpRoles[i]
                        })
                    );
                    */
                    wait(1);
                    fetch('http://localhost:5199/api/phanquyen',{
                        method: 'POST',
                        headers: {"Content-type": "application/json"},
                        body: JSON.stringify({
                            IDNhanVien: addEmp.idnhanvien,
                            IDQuyen: addEmpRoles[i]
                        })
                    });
                }
            }
            setAddEmpRoles([]);
            handleResetPage();
        }        
    };

    return (
        <div>
            <Stack direction="column" spacing={2} alignItems="flex-end" onClick={handleOpen} marginBottom={1}>
                <IconButton variant="text" color="primary">
                    <Tooltip title="Chỉnh Sửa"><EditIcon />
                    </Tooltip>
                </IconButton>
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                
                <Box sx={style}>
                    <Stack direction="column" spacing={2} alignItems="flex-end">
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Typography id="post-request-error-handling" variant="h5" style={{ paddingBottom: 40 }}>
                        Chỉnh Sửa Thông Tin Nhân Viên
                    </Typography>
                    <Box sx={AddForm__style}>
                        <Box
                            component="form" 
                            sx={{
                                '& > :not(style)': { m: 1 },
                            }} 
                            noValidate
                            autoComplete="off" 
                            onSubmit={handleSubmit}
                        >
                            <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <TextField
                                    onChange={(e) => setAddEmp({...addEmp, tennhanvien: e.target.value})}
                                    label="Tên Nhân Viên"
                                    defaultValue={employee.HoTen}
                                    variant="outlined"
                                    fullWidth
                                    required 
                                    error={tennhanvienError}
                                />
                            </Grid>
                            <Grid item xs={5}>
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
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    onChange={(e) => setAddEmp({...addEmp, sdt: e.target.value})}
                                    label="Số Điện Thoại" 
                                    defaultValue={employee.SoDienThoai}
                                    variant="outlined" 
                                    display="block"
                                    fullWidth 
                                    required 
                                    error={sdtError}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    onChange={(e) => setAddEmp({...addEmp, cccd: e.target.value})}
                                    label="Căn Cước Công Dân" 
                                    defaultValue={employee.CCCD}
                                    variant="outlined" 
                                    display="block"
                                    fullWidth 
                                    required 
                                    error={cccdError}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    onChange={(e) => setAddEmp({...addEmp, email: e.target.value})}
                                    label="Email" 
                                    defaultValue={employee.Email}
                                    variant="outlined" 
                                    display="block"
                                    fullWidth 
                                    required 
                                    error={emailError}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    onChange={(e) => setAddEmp({...addEmp, diachi: e.target.value})}
                                    label="Địa Chỉ" 
                                    defaultValue={employee.DiaChi}
                                    variant="outlined" 
                                    display="block"
                                    fullWidth 
                                    required 
                                    error={diachiError}
                                />
                            </Grid>
                            </Grid>
                            
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

                            <FormControl sx={{display: 'block'}}>
                            <FormLabel>Phân Quyền</FormLabel>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox value="1" defaultChecked={empRoles.includes(1) ? true : false} onChange={(e)=>getValue(e, empRoles)} />} label="Quản Trị" />
                                <FormControlLabel control={<Checkbox value="2" defaultChecked={empRoles.includes(2) ? true : false} onChange={(e)=>getValue(e, empRoles)} />} label="Thu Tiền" />
                                <FormControlLabel control={<Checkbox value="3" defaultChecked={empRoles.includes(3) ? true : false} onChange={(e)=>getValue(e, empRoles)} />} label="Thống Kê - Báo Cáo" />
                            </FormGroup>
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
                    </Box>
                </Box>
            </Modal>
        </div >
    );
}