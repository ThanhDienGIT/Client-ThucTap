import * as React from 'react';
import { useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
export default function ReceiptDetailModal({receipt}) {
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
            return "ádkashdk";
        }
    }
    const handleClose = () => setOpen(false);
 

    // const NgayCap = new Date(customer.NgayCap);
    const style = {

        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
        overflow:'scroll',
        height:'90%',
        display:'block',
        marginTop: 5,
        marginBottom: 10
    };
    const Info__style = {
        display: 'flex',
        width: 1000,
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
                                {/* <ReactToPrint
                                trigger={() => <button>Print this out!</button>}
                                content={() => ngaythu}
                                /> */}
                    <Stack direction="column" spacing={2} alignItems="flex-end">
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Typography variant="h4" style={{paddingBottom: 20,textAlign:"center" }}>
                        <b>Chi Tiết Phiếu Thu</b>
                    </Typography>
                    <Box sx={Info__style}>
                        <Typography variant="h6" style={{ width: 500, paddingBottom: 40, paddingRight: 40 }}>
                            <b>ID phiếu:</b> <Typography variant="h6">{receipt.IDPhieu}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 500, paddingBottom: 40, paddingRight: 40 }}>
                            <b>Tên khách hàng:</b> <Typography variant="h6">{receipt.HoTenKH}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 500, paddingBottom: 40, paddingRight: 40 }}>
                            <b>Tên tuyến thu:</b> <Typography variant="h6">{receipt.TenTuyenThu}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 500, paddingBottom: 40, paddingRight: 40 }}>
                            <b>Tên Kỳ thu:</b> <Typography variant="h6">{receipt.TenKyThu}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 500, paddingBottom: 40, paddingRight: 40 }}>
                            <b>Tên nhân viên:</b> <Typography variant="h6">{receipt.HoTen}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 500, paddingBottom: 40, paddingRight: 40 }}>
                            <b>Mẫu số phiếu:</b> <Typography variant="h6">{receipt.MauSoPhieu}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 500, paddingBottom: 40, paddingRight: 40 }}>
                            <b>Quận Huyện:</b> <Typography variant="h6">{receipt.TenQuanHuyen}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 500, paddingBottom: 40, paddingRight: 40 }}>
                            <b>Xã Phường:</b> <Typography variant="h6">{receipt.TenXaPhuong}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 500, paddingBottom: 30, paddingRight: 40 }}>
                            <b>Ngày tạo:</b> <Typography variant="h6">{ngaytao}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 500, paddingBottom: 30, paddingRight: 40 }}>
                            <b>Ngày thu:</b> <Typography variant="h6">{ngaythu}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 500, paddingBottom: 30, paddingRight: 40 }}>
                            <b>Trạng Thái:</b> <Typography variant="h6">{change(receipt.NgayThu)}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 500, paddingBottom: 30, paddingRight: 40 }}>
                            <b>Giá:</b> <Typography variant="h6">{receipt.Gia} VND</Typography>
                        </Typography>
                    </Box>
                </Box>
            </Modal>
        </div >
    );
}