import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import axios from 'axios';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ReceiptEditModal({receipt,allItems}) {
  const [open, setOpen] = React.useState(false);
  const [tentuyenthu,setTenTuyenThu] = React.useState('');
  const [ngaythu,setNgayThu] = React.useState('');
  //
  function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year + '-' + month + '-' + day;
}
const Day = new Date(receipt.NgayThu)
  //
  const handleOpen = () =>{
    setTenTuyenThu(receipt.TenTuyenThu);
    setNgayThu(getFormattedDate(new Date(receipt.NgayThu)));
    setOpen(true);
  } 
  const handleClose = () => setOpen(false);
  const handleTenTuyenThuChange = (event) =>{
    setTenTuyenThu(event.target.value);
  }
  return (
    <div>
      <Stack direction="column" spacing={2} alignItems="flex-end">
        <Button onClick={handleOpen}
         sx={{display: "flex", justifyContent: "flex-end"}}
          variant="outlined"
          color="warning" 
          startIcon={<EditIcon sx={{ fontSize: "80px" }} />}>
          </Button>
      </Stack>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography variant="h5" style={{ paddingBottom: 40,textAlign: "center" }}>
                        <b>Sửa Phiếu thu</b>
        </Typography>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 300,marginLeft:7 }}>
            <InputLabel id="demo-simple-select-standard-label">Tuyến thu</InputLabel>
            <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-tuyenthu"
            value={tentuyenthu}
            onChange={handleTenTuyenThuChange}
            label="tuyenthu"
            >
                      {allItems.map((item) => (
                      <MenuItem value={item.TenTuyenThu}>
                        {item.TenTuyenThu}
                      </MenuItem>
                      ))}
            </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="demo-simple-select-standard-label">Khách hàng</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
        <br></br>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 300,marginLeft: 7}}>
            <InputLabel id="demo-simple-select-standard-label">Kỳ thu</InputLabel>
            <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Age"
            >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-standard-label">Nhân viên</InputLabel>
            <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Age"
            >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 160,marginLeft: 7 }}>
        <InputLabel id="demo-simple-select-standard-label">Mã số phiếu</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
        <FormControl sx={{marginRight: 2}} >
            <TextField
                id="date"
                label="Ngày tạo"
                type="date"
                sx={{ width: 220 }}
                InputLabelProps={{
                shrink: true,
                }}
            />
        </FormControl>
        
        <TextField
            id="date"
            label="Ngày thu"
            type="date"
            sx={{ width: 220 }}
            defaultValue={ngaythu}
            InputLabelProps={{
            shrink: true,
            }}
        />
        <Stack direction="row" spacing={2}  style={{ paddingTop: 20,float: "right"}}>
            <Button variant="contained" >Lưu</Button>
            <Button variant="contained" onClick={handleClose}>Huỷ bỏ</Button>
        </Stack>
        </Box>
      </Modal>
    </div>
  );
}
