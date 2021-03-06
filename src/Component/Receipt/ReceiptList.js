import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import ReceiptDetailModal from './ReceiptDetailModal';
import ReceiptAddModal from './ReceiptAddModal';
import '../../CSS/App.css';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ExportReceiptList from './ExportReceiptList';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';

function ReceiptList() {
  //style
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1b98e0",
      color: theme.palette.common.white,
      fontWeight: "bold"
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


  //state
  const [rows, setRows] = React.useState([]);//state PhieuThu
  const [updateState, setUpdateState] = React.useState(true); //state reRender
  const [quanhuyen, setQuanHuyen] = React.useState([]);
  const [xaphuong, setXaPhuong] = React.useState([]);
  const [tuyenthu, setTuyenThu] = React.useState([]);
  const [loaikhachhang, setLoaiKhachHang] = React.useState([]);
  const [searchField, setSearchField] = React.useState(0);// state search
  const [chosenQuanHuyen, setChosenQuanHuyen] = React.useState(0);// state QuanHuyen
  const [chosenXaPhuong, setChosenXaPhuong] = React.useState(0);// state XaPhuong
  const [chosenTuyenThu, setChosenTuyenThu] = React.useState(0);// state TuyenThu
  const [chosenTrangThai, setChosenTrangThai] = React.useState(0);// state TuyenThu
  const [chosenTenKhachHang, setChosenTenKhachHang] = React.useState('');// state TenKhachHang
  const [chosenTenNhanVien, setChosenTenNhanVien] = React.useState('');// state TenNhanVien
  const [chosenLoaiKhachHang, setChosenLoaiKhachHang] = React.useState(0);// state TuyenThu
  const [changeshow, setChangeShow] = React.useState([]); // state Change

  // change status
  function change(date) {
    if (!date) {
      return 'Ch??a thu';
    } else {
      return '???? thu';
    }
  };
  // hidden button status
  const hiddenButtonStatus = (date) => {
    if (!date) {
      return 'X??c nh???n';
    }
    return '???? x??c nh???n';
  };  
  //get PhieuThu
  React.useEffect(() => {
    fetch("http://localhost:5199/api/PhieuThu")
      .then(response => response.json())
      .then(function (PhieuThu) {
        const Rows = PhieuThu;
        setRows(Rows);
      },
        (error) => {
          alert('Failed');
        })
  }, [updateState]);
  //get QuanHuyen
    React.useEffect(() => {
    fetch("http://localhost:5199/api/PhieuThu/quanhuyen")
      .then(response => response.json())
      .then(function (quanhuyen) {
        setQuanHuyen(quanhuyen);
      },
        (error) => {
          alert('Failed');
        })
    }, [updateState]);
  //get XaPhuong
    React.useEffect(() => {
    fetch("http://localhost:5199/api/PhieuThu/xaphuong")
      .then(response => response.json())
      .then(function (xaphuong) {
        setXaPhuong(xaphuong);   
      },
          
        (error) => {
          alert('Failed');
        })
    }, [updateState]);
  //getTuyenThu
      React.useEffect(() => {
      fetch("http://localhost:5199/api/PhieuThu/tuyenthu")
      .then(response => response.json())
      .then(function (tuyenthu) {
        setTuyenThu(tuyenthu);   
      },
          
        (error) => {
          alert('Failed');
        })
      }, [updateState]);
  //getLoaiKhachHang
      React.useEffect(() => {
        fetch("http://localhost:5199/api/PhieuThu/loaikhachhang")
        .then(response => response.json())
        .then(function (loaikhachhang) {
          setLoaiKhachHang(loaikhachhang);   
        },
            
          (error) => {
            alert('Failed');
          })
      }, [updateState]);
//hadle delete
const reRender = () => setUpdateState(!updateState);
const handleDelete = (id) => {
  if (window.confirm('B???n c?? ch???c ch???n mu???n xo?? phi???u thu n??y ?')) {
      fetch("http://localhost:5199/api/PhieuThu/" + id, {
          method: 'DELETE',
          header: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      })
          .then(res => res.json())
          .then((result) => {
              alert(result);
          });
          console.log('delete');
          reRender();
  }
}
  //setState DiaChi
    // handle QuanHuyen
  const handleQuanHuyen = (event) => {
    setChosenQuanHuyen(event.target.value);
            setPage(0);
        setRowsPerPage(-1);
  }
  React.useEffect(() => {
    QuanHuyen(rows);
  }, [chosenQuanHuyen]);
  
  const QuanHuyen = (quanhuyen) => {
    const b = rows.filter((row) => {
      if (chosenQuanHuyen === "") {
        return row;
      }
      else if (row.IDQuanHuyen === chosenQuanHuyen) {
        return row;
      }
    })
    console.log('sadasd', b);
    setChangeShow(b);
  }
  // handle XaPhuong
    const handleXaPhuong = (event) => {
      setChosenXaPhuong(event.target.value);
              setPage(0);
        setRowsPerPage(-1);
    }
  
    React.useEffect(() => {
      XaPhuong(rows);

    }, [chosenXaPhuong]);  
    const XaPhuong = (xaphuong) => {
      const c = rows.filter((row) => {
        if (chosenXaPhuong === 0 && row.IDQuanHuyen === chosenQuanHuyen ) {
          return row;
        }
        else if (chosenXaPhuong === 0 && chosenQuanHuyen === 0) {
          return row;
        }
        else if (row.IDXaPhuong === chosenXaPhuong) {
          return row;
        }
      })
      setChangeShow(c);
    }
    //handle TuyenThu
    const handleTuyenThu = (event) => {
      setChosenTuyenThu(event.target.value);
              setPage(0);
        setRowsPerPage(-1);
    }
  
    React.useEffect(() => {
      TuyenThu(rows);
    }, [chosenTuyenThu]);  
  
    const TuyenThu = (tuyenthu) => {
      const d = rows.filter((row) => {
        if (chosenTuyenThu === "") {
          return row;
        }
        else if (row.IDTuyenThu === chosenTuyenThu) {
          console.log('tuyen thu',row);
          return row;
        }
      })
      setChangeShow(d);
    }
  //handle TrangThai
  const handleTrangThai = (event) => {
    setChosenTrangThai(event.target.value);
            setPage(0);
        setRowsPerPage(-1);
    console.log('tt',event.target.value);
  }
  React.useEffect(() => {
    TrangThai(rows);
  }, [chosenTrangThai]);  
  const TrangThai = (trangthai) => {
    const d = rows.filter((row) => {
      if (row.NgayThu != null && chosenTrangThai === 1) {
          console.log(row);
          return row;
      } else if (row.NgayThu === null && chosenTrangThai === 2) {
          console.log(row);
          return row;
      }
      else if (chosenTrangThai === 0) {
        console.log(row);
        return row;
      }
    })
    setChangeShow(d);
  }
  //handle LoaiKhachHang
    //handleTrangThai
  const handleLoaiKhachHang = (event) => {
    console.log('value', event.target.value);
            setPage(0);
        setRowsPerPage(-1);
    setChosenLoaiKhachHang(event.target.value);
  }
  React.useEffect(() => {
    LoaiKhachHang(rows);
  }, [chosenLoaiKhachHang]);  

  const LoaiKhachHang = (loaikhachhang) => {
    const i = rows.filter((row) => {
      if (row.IDLoaiKhachHang === chosenLoaiKhachHang) {
        console.log('loai', row);
        return row;
      }
    })
    setChangeShow(i);
  }
    //show phieu thu
  const showPhieuThu = function (Phieu) {
    var PhieusPerPage
        if (rowsPerPage === -1) {
          PhieusPerPage = Phieu.length;
        } else {
          PhieusPerPage = rowsPerPage;
        }
    if (Phieu.length > 0) {
      return (
        Phieu
          .slice(page * PhieusPerPage, page * PhieusPerPage + PhieusPerPage) 
          .map((row) => (
            <StyledTableRow key={row.IDPhieu}>
              <StyledTableCell component="th" scope="row">
                {row.MaSoPhieu}
              </StyledTableCell>
              <StyledTableCell align="left">{row.MaKhachHang}</StyledTableCell>
              <StyledTableCell align="left">{row.HoTenKH}</StyledTableCell>
              <StyledTableCell align="left">{row.TenLoai}</StyledTableCell>
               {
                change(row.NgayThu) === '???? thu' ?
                  <StyledTableCell id="tt" align="left" sx={{ color: "var(--color7)" }}>{change(row.NgayThu)}</StyledTableCell>
                  :
                  <StyledTableCell id="tt" align="left" sx={{ color: "var(--color9)" }}>{change(row.NgayThu)}</StyledTableCell>
              }
              <StyledTableCell align="left">{row.TenKyThu}</StyledTableCell>
              {/* function */}
              <StyledTableCell align="left" padding='none'>
              </StyledTableCell>
              <StyledTableCell align="left" padding='none'> 
                <ButtonGroup variant="" aria-label="button group">       
                  <ReceiptDetailModal receipt={row} />
                   <Button disabled={row.NgayThu} onClick={() => handleDelete(row.IDPhieu)} sx={{ display: "flex", justifyContent: "flex-end",marginRight: 0,color: "var(--color9)"}} startIcon={<DeleteIcon sx={{ fontSize: "80px" }} />} ></Button>
                </ButtonGroup>  
              </StyledTableCell>
            </StyledTableRow>
          ))
      )
    }else {
            return (
                <TableRow>
                    <StyledTableCell align='center' colSpan={8} width={5}>Kh??ng t??m th???y k???t qu??? t????ng ???ng</StyledTableCell>
                </TableRow>
            )
        }

  }
  //show XaPhuong 
  function showXaPhuong(xaphuong) {
    if (xaphuong.IDQuanHuyen === chosenQuanHuyen) {
      return (
            <MenuItem value={xaphuong.IDXaPhuong} key={xaphuong.IDXaPhuong}>
              {xaphuong.TenXaPhuong}
            </MenuItem>
          )
    } else if (chosenQuanHuyen === 0) {
      return (
            <MenuItem value={xaphuong.IDXaPhuong} key={xaphuong.IDXaPhuong}>
              {xaphuong.TenXaPhuong}
            </MenuItem>
          )
    }
  }
  //showTuyenThu
  function showTuyenThu(tuyenthu) {
      return (
            <MenuItem value={tuyenthu.IDTuyenThu} key={tuyenthu.IDTuyenThu}>
              {tuyenthu.TenTuyenThu}
            </MenuItem>
          )
  }
  //showLoaiKhachHang
  function showLoaiKhachHang(loaikhachhang) {
    return (
            <MenuItem value={loaikhachhang.IDLoaiKhachHang} key={loaikhachhang.IDLoaiKhachHang}>
              {loaikhachhang.TenLoai}
            </MenuItem>
          )
  }
  //handle search
  const handleSearch = (event) => {
    setSearchField(event.target.value);
    setChosenLoaiKhachHang(0);
    setChosenQuanHuyen(0);
    setChosenTenKhachHang('');
    setChosenTenNhanVien('');
    setChosenTrangThai(0);
    setChosenTuyenThu(0);
    setChosenXaPhuong(0);
  }
  //handleSearchInput
  const handleChangeSearchInputKH = (event) => {
    setChosenTenKhachHang(event.target.value);
    setPage(0);
    setRowsPerPage(-1);
    console.log(event.target.value);
  }
  React.useEffect(() => {
    TenKhachHang(rows);
  }, [chosenTenKhachHang]);  

  const TenKhachHang = (tenkhachhang) => {
    const f = rows.filter((row) => {
      if (row.HoTenKH.toLowerCase().includes(chosenTenKhachHang.toLowerCase())) {
          return row;
      }
    })
    setChangeShow(f);
  }
  //handleSearchInput
  const handleChangeSearchInputNV = (event) => {
    setChosenTenNhanVien(event.target.value);
    setPage(0);
    setRowsPerPage(-1);
    console.log(event.target.value);
  }
  React.useEffect(() => {
    TenNhanVien(rows);
  }, [chosenTenNhanVien]);  
  const TenNhanVien = (tennhanvien) => {
    const g = rows.filter((row) => {
      if (row.HoTen !== null && row.HoTen.toLowerCase().includes(chosenTenNhanVien.toLowerCase())) {
          return row;
      }
    })
    setChangeShow(g);
  }
  //show filter DiaChi
  function showfilterQuanHuyen() {
    if (searchField === 1) {
      return (
        <FormControl sx={{ m: 1, minWidth: 300 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="select-district1"
          value={chosenQuanHuyen}
          onChange={handleQuanHuyen}
        > 
            <MenuItem value={0} key={0}>
             Ch???n Qu???n Huy???n
            </MenuItem>
              {quanhuyen
                .map((quanhuyen) => (
                    <MenuItem value={quanhuyen.IDQuanHuyen} key={quanhuyen.IDQuanHuyen}>
                      {quanhuyen.TenQuanHuyen}
                    </MenuItem>
            ) 
            )}      
        </Select>
      </FormControl>
      )
    }
  }
  function showfilterXaPhuong() {
    if (searchField === 1) {
      return (
       <FormControl sx={{ m: 1, minWidth: 300}}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="select-district2"
          value={chosenXaPhuong}
          onChange={handleXaPhuong}
        >
            <MenuItem value={0} key={0}>
             Ch???n X?? Ph?????ng
            </MenuItem>
          {xaphuong
            .map((xaphuong) => (
               showXaPhuong(xaphuong)
            ))
          }
        </Select>
      </FormControl>
      )
    }
  }
  //show filter TuyenThu
  function showfilterTuyenThu() {
    if (searchField === 2) {
      return (
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="select-district3"
          value={chosenTuyenThu}
          onChange={handleTuyenThu}
        >
          <MenuItem value={0} key={0}>
            Ch???n tuy???n thu
          </MenuItem>
          {tuyenthu
            .map((tuyenthu) => (
              showTuyenThu(tuyenthu)
            ))
          }
        </Select>
      </FormControl>
    );
    }
    
  }
  //show filter TrangThai
  function showfilterTrangThai() {
    if (searchField === 3) {
      return (
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="select-district3"
          value={chosenTrangThai}
          onChange={handleTrangThai}
        >
          <MenuItem value={0}>Tr???ng th??i</MenuItem>
          <MenuItem value={1}>???? thu</MenuItem>
          <MenuItem value={2}>Ch??a thu</MenuItem>
        </Select>
      </FormControl>
      )
    }
    
  }
  //show filter TenKhachHang
    function showfilterTenKhachHang() {
    if (searchField === 4) {
      return (
        <FormControl sx={{ m: 1, minWidth: 300 }}>
           <InputLabel htmlFor="outlined-adornment-search">T??n kh??ch h??ng</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-search"
                        type="text"
                        onChange={handleChangeSearchInputKH}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="button search"
                                    edge="end"                                  
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        label=" T??m Ki???m "
                    />
        </FormControl>
      )
    }
    
  }
  //show filter TenNhanVien
      function showfilterTenNhanVien() {
    if (searchField === 5) {
      return (
        <FormControl sx={{ m: 1, minWidth: 300 }}>
           <InputLabel htmlFor="outlined-adornment-search">T??n nh??n vi??n</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-search"
                        type="text"
                        onChange={handleChangeSearchInputNV}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="button search"
                                    edge="end"                                  
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        label=" T??m Ki???m "
                    />
        </FormControl>
      )
    }
    
  }
  //show filter LoaiKhachHang
  function showfilterLoaiKhachHang() {
    if (searchField === 6) {
      return (
        <FormControl sx={{ m: 1, minWidth: 300 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="select-district3"
          value={chosenLoaiKhachHang}
          onChange={handleLoaiKhachHang}
        >
          <MenuItem value={0} key={0}>
            Ch???n Lo???i Kh??ch H??ng
          </MenuItem>
          {loaikhachhang
            .map((loaikhachhang) => (
              showLoaiKhachHang(loaikhachhang)
            ))
          }
        </Select>
      </FormControl>
      )
    }
    
  }
  //page
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showTablePagination, setShowTablePagination] = React.useState(true);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleShowTablePagination = function () {
        if (chosenQuanHuyen === 0 && chosenXaPhuong === 0 && chosenLoaiKhachHang === 0 && chosenTuyenThu === 0 && chosenTrangThai ===0 && chosenTenKhachHang === '' && chosenTenNhanVien === '') {
            if (showTablePagination)
                return (
                    <TablePagination
                        rowsPerPageOptions={[10, 50, { value: -1, label: 'T???t C???' }]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                );
        } else {
            return (
                <TablePagination
                    rowsPerPageOptions={[10, 50, { value: -1, label: 'T???t C???' }]}
                    component="div"
                    count={changeshow.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            );
        }
    }
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 170,textAlign:'center' }}>
          <Select
            labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={searchField}
          onChange={handleSearch}
        >
            <MenuItem value={0}>---L???c---</MenuItem>
            <MenuItem value={1}>?????a ch???</MenuItem>
            <MenuItem value={2}>Tuy???n Thu</MenuItem>
            <MenuItem value={3}>Tr???ng Th??i</MenuItem>
            <MenuItem value={4}>T??n Kh??ch H??ng</MenuItem>
            <MenuItem value={5}>T??n Nh??n Vi??n</MenuItem>
            <MenuItem value={6}>Lo???i Kh??ch H??ng</MenuItem>
          </Select>
      </FormControl>
      {/* QuanHuyen */}
        {showfilterQuanHuyen()}
      {/* Xa Phuong */}
        {showfilterXaPhuong()}
      {/* Tuyen Thu */}
        {showfilterTuyenThu()}
      {/* TT */}
        {showfilterTrangThai()}
      {/* Ten Khach Hang */}
        {showfilterTenKhachHang()}
      {/* Ten Nhan Vien */}
      {showfilterTenNhanVien()}
      {/* Loai Khach Hang */}
      {showfilterLoaiKhachHang()}
          {
            chosenQuanHuyen !== 0 || chosenXaPhuong !== 0 || chosenLoaiKhachHang !== 0 || chosenTuyenThu !== 0 || chosenTrangThai !==0 ||chosenTenKhachHang !== ''? 
              <ExportReceiptList phieuthu={changeshow} />
                  :
              <ExportReceiptList phieuthu={rows} />
          }
      <ReceiptAddModal />
      <br></br>
      <hr></hr>
      <br></br>
      {/* list */}
      <div><h2>Danh s??ch phi???u thu</h2></div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>M?? Phi???u thu</StyledTableCell>
              <StyledTableCell align="left">M?? kh??ch h??ng</StyledTableCell>
              <StyledTableCell align="left">T??n kh??ch h??ng</StyledTableCell>
              <StyledTableCell align="left">Lo???i kh??ch h??ng</StyledTableCell>
              <StyledTableCell align="left">Tr???ng th??i</StyledTableCell>
              <StyledTableCell align="left">T??n k??? thu</StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              chosenQuanHuyen !== 0 || chosenXaPhuong !== 0 || chosenLoaiKhachHang !== 0 || chosenTuyenThu !== 0 || chosenTrangThai !==0 ||chosenTenKhachHang !== '' || chosenTenNhanVien != '' ? 
                showPhieuThu(changeshow)
                :
                showPhieuThu(rows)
            }
          </TableBody>
          </Table>
        </TableContainer>
      {handleShowTablePagination()}
    </Paper>
    </div>
  )
}

  export default ReceiptList;