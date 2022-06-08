import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { FormLabel, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';


const style = {

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};
const Info__style = {
    display: 'flex',
    width: 1000,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10
};
function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + '/' + month + '/' + year;
}
export default function CustomerFormView({ customer }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const NgayCap = new Date(customer.NgayCap);
    const NgayChinhSua = new Date(customer.NgayChinhSua);
    const NgayTao = new Date(customer.NgayTao);
    return (
        <div>
            <IconButton onClick={handleOpen} variant="text" color="primary">
                <Tooltip title="Xem Chi Tiết"><VisibilityIcon />
                </Tooltip>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h5" style={{ paddingBottom: 40 }}>
                        Chi Tiết Thông Tin:
                    </Typography>
                    <Box sx={Info__style}>
                        <Typography variant="h7" style={{ width: 700, paddingBottom: 40, paddingRight: 40 }}>
                            Họ Tên: <Typography variant="h6">{customer.HoTenKH}</Typography>
                        </Typography>
                        <Typography variant="h7" style={{ width: 300, paddingBottom: 40, paddingRight: 40 }}>
                            Mã Số Khách Hàng: <Typography variant="h6">{customer.MaKhachHang}</Typography>
                        </Typography>
                        <Typography variant="h7" style={{ width: 700, paddingBottom: 40, paddingRight: 40 }}>
                            Ngày Tạo: <Typography variant="h6">{getFormattedDate(NgayTao)}</Typography>
                        </Typography>
                        <Typography variant="h7" style={{ width: 300, paddingBottom: 40, paddingRight: 40 }}>
                            Chỉnh Sửa Lần Cuối: <Typography variant="h6">{getFormattedDate(NgayChinhSua)}</Typography>
                        </Typography>
                        <Typography variant="h7" style={{ width: 700, paddingBottom: 40, paddingRight: 40 }}>
                            Số CCCD: <Typography variant="h6">{customer.CCCD}</Typography>
                        </Typography>
                        <Typography variant="h7" style={{ width: 300, paddingBottom: 40, paddingRight: 40 }}>
                            Ngày Cấp CCCD: <Typography variant="h6">{getFormattedDate(NgayCap)}</Typography>
                        </Typography>
                        <Typography variant="h7" style={{ width: 700, paddingBottom: 40, paddingRight: 40 }}>
                            Địa Chỉ: <Typography variant="h6">{customer.DiaChi}, {customer.TenQuanHuyen}, {customer.TenXaPhuong}</Typography>
                        </Typography>
                        <Typography variant="h7" style={{ width: 300, paddingBottom: 40, paddingRight: 40 }}>
                            Loại Khách Hàng: <Typography variant="h6">{customer.TenLoai}</Typography>
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={2} style={{ paddingTop: 40, marginLeft: 1050 }}>
                        <Button variant="contained" onClick={handleClose}>Đóng</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}