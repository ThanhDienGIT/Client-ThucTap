import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

//stype
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  width: 800
};
export default function ReceiptAddModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rows, setRows] = React.useState([]);


//tuyenthu
  const [tuyenthu, setTuyenThu] = React.useState(0);
  const handleChange = (event: SelectChangeEvent) => {
    setTuyenThu(event.target.value);
  };


  //Phieuthu
  React.useEffect(() => {
    fetch("http://localhost:5199/api/PhieuThu")
        .then(response => response.json())
        .then(function (PhieuThu) {
            setRows(PhieuThu);
        },
            (error) => {
                alert('Failed');
            })
}, [])
  return (
    <div>
        <Stack direction="column" spacing={2} alignItems="flex-end">
            <Button onClick={handleOpen}
            sx={{display: "flex", justifyContent: "flex-end"}}
                variant="outlined" color="success"
                startIcon={<AddIcon sx={{ fontSize: "80px" }} />}>

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
                        <b>Thêm Phiếu thu</b>
        </Typography>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 300,marginLeft:7 }}>
            <InputLabel id="demo-simple-select-standard-label">Tuyến thu</InputLabel>
            <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-tuyenthu"
            label="tuyenthu"
            value={tuyenthu}
            onChange={handleChange}
            >
              {rows
                .map((row) => (
                  <MenuItem value={row.IDTuyenThu} key={row.IDTuyenThu}>
                    {row.TenTuyenThu}
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
            InputLabelProps={{
            shrink: true,
            }}
        />
        <Stack direction="row" spacing={2}  style={{ paddingTop: 20,float: "right"}}>
            <Button variant="contained" >Thêm</Button>
            <Button variant="contained" onClick={handleClose}>Huỷ bỏ</Button>
        </Stack>
        </Box>
      </Modal>
    </div>
  );
}