import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { color } from '@mui/system';
import { faBlackboard } from '@fortawesome/free-solid-svg-icons';
import CloseIcon from '@mui/icons-material/Close';
import Customer from './Customer';


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
export default function CustomerFormAdd(customer) {
    const [Name, setName] = React.useState('');

    const [CCCD, setCCCD] = React.useState('');

    const [DayGrant, setDayGrant] = React.useState('');

    const [Address, setAddress] = React.useState('');

    const [chosenDistrict, setChosenDistrict] = React.useState(0);

    const [chosenWard, setChosenWard] = React.useState(0);

    const [chosenCustomerType, setChosenCustomerType] = React.useState(0);

    const [wards, setWards] = React.useState([]);

    const [districts, setDistricts] = React.useState([]);

    const [customerTypes, setCustomerTypes] = React.useState([]);

    const [customers, setCustomer] = React.useState([])

    React.useEffect(() => {
        axios.get(`http://localhost:5199/api/KhachHang/`)
            .then(res => {
                const Customers = res.data;
                setCustomer(Customers);
            })
    }, [])
    React.useEffect(() => {
        axios.get(`http://localhost:5199/api/QuanHuyen`)
            .then(res => {
                const districts = res.data;
                setDistricts(districts);
            })
    }, [])

    React.useEffect(() => {
        axios.get(`http://localhost:5199/api/XaPhuong/`)
            .then(res => {
                const wards = res.data;
                setWards(wards);
            })
    }, [])

    React.useEffect(() => {
        axios.get(`http://localhost:5199/api/LoaiKhachHang`)
            .then(res => {
                const customerTypes = res.data;
                setCustomerTypes(customerTypes);
            })
    }, [])

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleInputName = (event) => {
        setName(event.target.value)
    }
    const handleInputCCCD = (event) => {
        setCCCD(event.target.value)
    }
    const handleInputDayGrant = (event) => {
        setDayGrant(event.target.value)
    }
    const handleInputAddress = (event) => {
        setAddress(event.target.value)
    }
    const handleClose = () => setOpen(false);

    const handleChangeDistrict = (event) => {
        setChosenDistrict(event.target.value);
        setChosenWard(0);
    };

    const handleChangeWard = (event) => {
        setChosenWard(event.target.value);
    };

    const handleCustomerType = (event) => {
        setChosenCustomerType(event.target.value);
    };

    function handleShowWard(ward) {
        if (ward.IDQuanHuyen === chosenDistrict) {
            return (
                <MenuItem value={ward.IDXaPhuong} key={ward.IDXaPhuong}>
                    {ward.TenXaPhuong}
                </MenuItem>
            )
        }
    }

    const handleSubmit = () => {
        if (Name === "") {
            alert('Hãy Điền Họ và Tên')
        } else {
            if (CCCD === "") {
                alert('Hãy Điền Căn Cước Công Dân')
            } else {
                if (DayGrant === "") {
                    alert('Hãy Điền Ngày Cấp CCCD')
                } else {
                    if (Address === "") {
                        alert('Hãy Điền Địa Chỉ')
                    } else {
                        if (chosenDistrict === 0) {
                            alert('Hãy Điền Quận Huyện')
                        } else {
                            if (chosenWard === 0) {
                                alert('Hãy Điền Xã Phường')
                            } else {
                                if (chosenCustomerType === 0) {
                                    alert('Hãy Điền Loại Khách Hàng')
                                } else {
                                    const current = new Date();
                                    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
                                    let MaxCustomer = customers.length + 1;
                                    alert(Name + " " + Address + " " + CCCD + " " + DayGrant + " " + chosenDistrict + " " + chosenWard + " " + chosenCustomerType)
                                    const element = document.querySelector('#post-request-error-handling .article-id');
                                    const article = {
                                        "hoTenKH": Name,
                                        "DiaChi": Address,
                                        "cccd": CCCD,
                                        "ngayCap": DayGrant,
                                        "idXaPhuong": chosenWard,
                                        "idLoaiKhachHang": chosenCustomerType,
                                        "maKhachHang": "KH" + MaxCustomer,
                                        "ngayTao": date,
                                    };
                                    console.log(article)
                                    axios.post('http://localhost:5199/api/KhachHang', article)
                                        .then(response => element.innerHTML = response.data.id)
                                        .catch(error => {
                                            element.parentElement.innerHTML = `Error: ${error.message}`;
                                            console.error('There was an error!', error);
                                        });
                                }
                            }
                        }
                    }
                }
            }
        }

    };
    return (
        <div>
            <Stack direction="column" spacing={2} alignItems="flex-end" marginBottom={1}>
                <Button variant="contained" onClick={handleOpen}>Thêm Khách Hàng</Button>
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
                    <Typography variant="h5" style={{ paddingBottom: 40 }}>
                        Thêm Khách Hàng Mới
                    </Typography>
                    <Box sx={AddForm__style}>
                        <Box sx={Info__style}>
                            <TextField
                                required
                                label="Họ và Tên"
                                variant="outlined"
                                onChange={handleInputName}

                            >
                            </TextField>
                            <TextField
                                required
                                label="Số CCCD"
                                variant="outlined"
                                style={{ marginTop: '20px' }}
                                onChange={handleInputCCCD}
                            >
                            </TextField>
                            <TextField
                                required
                                type="date"
                                label="Ngày Cấp CCCD" variant="outlined"
                                defaultValue="2020-01-01"
                                style={{ marginTop: '20px' }}
                                onChange={handleInputDayGrant}
                            >
                            </TextField>
                            <TextField
                                required
                                label="Địa Chỉ"
                                variant="outlined"
                                style={{ marginTop: '20px' }}
                                onChange={handleInputAddress}
                            >
                            </TextField>
                        </Box>
                        <Box sx={Info__style}>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-district"
                                value={chosenDistrict}
                                onChange={handleChangeDistrict}
                            >
                                <MenuItem value={0} key={0}>
                                    Hãy Chọn Quận Huyện
                                </MenuItem>
                                {districts
                                    .map((district) => (
                                        <MenuItem value={district.IDQuanHuyen} key={district.IDQuanHuyen}>
                                            {district.TenQuanHuyen}
                                        </MenuItem>
                                    ))}
                            </Select>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                value={chosenWard}
                                onChange={handleChangeWard}
                                style={{ marginTop: '20px' }}
                            >
                                <MenuItem value={0} key={0}>
                                    Hãy Chọn Xã Phường
                                </MenuItem>
                                {wards
                                    .map((ward) => (
                                        handleShowWard(ward)
                                    ))}
                            </Select>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                value={chosenCustomerType}
                                onChange={handleCustomerType}
                                style={{ marginTop: '20px' }}
                            >
                                <MenuItem value={0} key={0}>
                                    Hãy Chọn Loại Khách Hàng
                                </MenuItem>
                                {customerTypes
                                    .map((customerType) => (
                                        <MenuItem value={customerType.IDLoaiKhachHang} key={customerType.IDLoaiKhachHang}>
                                            {customerType.TenLoai}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </Box>
                    </Box>
                    <Stack direction="column" spacing={2} alignItems="flex-end">
                        <Button variant="contained" onClick={handleSubmit}>Thêm Khách Hàng</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}