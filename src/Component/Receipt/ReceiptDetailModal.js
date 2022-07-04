import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
export default function ReceiptDetailModal({receipt,ref}) {
    const [open, setOpen] = React.useState(false);
    const [ngaythu,setNgayThu] = React.useState('');
    const [ngaytao, setNgayTao] = React.useState('');
    //change tt
     function change(date) {
    if (!date) {
      return 'Chưa thu';
    } else {
      return 'Đã thu';
    }

    }
    const getFormattedDate = (date) => {
            var year = date.getFullYear();
        
            var month = (1 + date.getMonth()).toString();
            month = month.length > 1 ? month : '0' + month;
        
            var day = date.getDate().toString();
            day = day.length > 1 ? day : '0' + day;
            return day + '-' + month + '-' + year;
    }
    const handleOpen = () => {
        setOpen(true);
        setNgayTao(getFormattedDate(new Date(receipt.NgayTao)));
        if (receipt.NgayThu != null) {
            setNgayThu(getFormattedDate(new Date(receipt.NgayThu)));
        } else {
            return "open fail";
        }
    }
    const handleClose = () => setOpen(false);
const style = {

        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 1,
        overflow:'scroll',
        height:'85%',
        display:'block',
        marginTop: 5,
        marginBottom: 5,
        
    };

        const Info__style = {
        display: 'flex',
        width: 800,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 10
    };
    return (
        <div>
           <Stack direction="column" spacing={2} alignItems="flex-end">
                <Button onClick={handleOpen}
                    sx={{display: "flex", justifyContent: "flex-end", color: "var(--color7)"}}
                    startIcon={<VisibilityIcon sx={{ fontSize: "80px" }} />}>
                </Button>
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
                    <Box>
                        <Typography variant="h5" style={{paddingBottom: 20,textAlign:"center",marginTop: 20 }}>
                            <b>Công Ty Môi Trường SHIZEN</b>
                        </Typography>
                        <Typography variant="h4" style={{paddingBottom: 20,textAlign:"center" }}>
                            <b>Hóa đơn</b>
                        </Typography>
                        <Box sx={Info__style}>
                            <Typography variant="h6" style={{ width: 900, paddingBottom: 0, paddingRight: 40 }}>
                                    <b>ID Hóa Đơn: </b>{receipt.MaSoPhieu}
                            </Typography>
                            <Typography variant="h6" style={{width: 400, paddingBottom: 0, paddingRight: 40 }}>
                                <Typography variant="h6">{receipt.TenKyThu}</Typography>
                            </Typography>
                            <Typography variant="h6" style={{ width: 400, paddingBottom: 0, paddingRight: 40 }}>
                                <Typography variant="h6">Từ ngày: {ngaytao} đến {ngaythu} </Typography>
                            </Typography>
                            <Typography variant="h6" style={{ width: 800, paddingBottom: 0, paddingRight: 40 }}>
                                <b>Tên KH: </b>{receipt.HoTenKH} <b>({receipt.MaKhachHang})</b>
                            </Typography>
                            <Typography variant="h6" style={{ width: 400, paddingBottom: 0, paddingRight: 40 }}>
                                <b>Loại hộ: </b>{receipt.TenLoai}
                            </Typography>
                             <Typography variant="h6" style={{ width: 400, paddingBottom: 0, paddingRight: 40 }}>
                                <b>Địa chỉ: </b> Phường {receipt.TenXaPhuong},{receipt.TenQuanHuyen}
                            </Typography>
                            <Typography variant="h6" style={{width: 900,paddingBottom: 0, paddingRight: 40 }}>
                                <b>Tuyến thu: </b>{receipt.TenTuyenThu} <b>({receipt.MaTuyenThu})</b>
                            </Typography>
                            <Typography variant="h6" style={{width:400,paddingBottom: 0, paddingRight: 40 }}>
                                <b>Nhân viên thu: </b> {receipt.HoTen} (<b>{receipt.MaNhanVien}</b>)
                            </Typography>
                            <Typography variant="h6" style={{ width:400, paddingBottom: 0, paddingRight: 40 }}>
                                <b>Mẫu số phiếu: </b> {receipt.MauSoPhieu}
                            </Typography>
                            <Typography variant="h6" style={{ width: 400, paddingBottom: 0, paddingRight: 40 }}>
                                <b>Trạng Thái: </b> {change(receipt.NgayThu)}
                            </Typography>
                            <Typography variant="h6" style={{ width: 400, paddingBottom: 0, paddingRight: 40 }}>
                                <b>Tổng tiền: </b> <Typography variant="h6">{receipt.Gia} VND</Typography>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div >
    );
}