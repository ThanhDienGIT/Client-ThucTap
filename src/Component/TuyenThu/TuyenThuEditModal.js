import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function TuyenThuEditModal({ idTuyenThu, tenTuyenThu, idNhanVien, idQuanHuyen, nhanVienList, reRenderTuyenThuMain }) {
    const [open, setOpen] = React.useState(false);
    const [nhanVien, setNhanVien] = React.useState(-1);
    const handleOpen = () => {
        if (idNhanVien !== null) {
            setNhanVien(idNhanVien);
        }
        else {
            setNhanVien(-1);
        }
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const handleNhanVienChange = (event) => {
        setNhanVien(event.target.value);
    };

    const handleSubmit = () => {
        if (nhanVien !== -1) {
            fetch("http://localhost:5199/api/tuyenthu", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    IDNhanVien: nhanVien,
                    IDTuyenThu: idTuyenThu,
                    IDQuanHuyen: idQuanHuyen,
                })
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    handleClose();
                },
                    (error) => {
                        alert('Failed');
                    });

            reRenderTuyenThuMain();
        }
        else{
            alert('Chỉnh sửa nhân viên không thể có giá trị: None');
        }
    }

    return (
        <div>
            <IconButton variant="text" sx={{ color: 'var(--color8)' }} onClick={handleOpen}>
                <Tooltip title="Chỉnh Sửa">
                    <EditIcon />
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
                        Sửa thông tin tuyến thu
                    </Typography>
                    {/* <Typography variant="h5" style={{ paddingBottom: 40 }}>
                        {tenTuyenThu}
                    </Typography> */}
                    <TextField
                        label="Tên tuyến thu"
                        value={tenTuyenThu}
                        style={{ paddingBottom: 20, width: 500 }}
                        InputProps={{
                            readOnly: true,
                        }}
                    />

                    <FormControl style={{ width: 500 }}>
                        <InputLabel>Tên nhân viên</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={nhanVien}
                            label="Tên nhân viên"
                            onChange={handleNhanVienChange}
                        >
                            {
                                nhanVienList.map(nhanVien => (
                                    <MenuItem key={nhanVien.IDNhanVien} value={nhanVien.IDNhanVien}> {nhanVien.HoTen} </MenuItem>
                                ))
                            }
                            <MenuItem key="all-QuanHuyen" value={-1}>None</MenuItem>
                        </Select>
                    </FormControl>

                    <Stack direction="row" spacing={2} style={{ paddingTop: 40 }}>
                        <Button variant="contained" onClick={handleSubmit}>Chỉnh sửa</Button>
                        <Button variant="contained" onClick={handleClose}>Huỷ bỏ</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}
