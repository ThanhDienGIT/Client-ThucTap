import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Box , Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, Tab, Tabs, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import axios from 'axios'
function CustomerStatistical() {
   
  useEffect(()=> {
    axios.get('http://localhost:5199/api/ThongKe/GetCustomer')
          .then(res => res.data)
          .then(res => SetDatatemporary(res));
    axios.get('http://localhost:5199/api/ThongKe/GetKyThu')
          .then(res => res.data)
          .then(res => setKythu(res));
    axios.get('http://localhost:5199/api/ThongKe/GetQuanHuyen')
          .then(res => res.data)
          .then(res => setQuanHuyen(res));
    axios.get('http://localhost:5199/api/ThongKe/GetTuyenThu')
          .then(res => res.data)
          .then(res => setTuyenThu(res));
  },[])
  

  
 

  // giữ tạm thời để lọc
  const [datatemporary , SetDatatemporary] = useState([{
    DiaChi: "",
    HoTenKH: "",
    MaKhachHang: "",
    Nam: 0,
    NgayThu: "",
    TenKyThu: "",
    TenQuanHuyen: "",
    TenTuyenThu: "",
    TenXaPhuong: "",
    Thang: 0,
    TrangThai: 0,
  }])


  function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return year + '-' + month + '-' + day;
    }
  
    const Today = new Date();

    const NgayMacDinh = getFormattedDate(Today);

 
// Các useState giữ dữ liệu để render ra
  const [QuanHuyen, setQuanHuyen] = React.useState([{
    IDQuanHuyen : 0,
    TenQuanHuyen : ''
  }]);
  const [XaPhuong, setXaPhuong] = React.useState([{
    IDXaPhuong : 0,
    TenXaPhuong : '',
    IDQuanHuyen :0,
    TenQuanHuyen : ''
  }]);
  const [KyThu,setKythu] = React.useState([{
    IDKyThu: 0,
    Nam: 0,
    TenKyThu: "",
    Thang: 0,
  }]);
  const [TuyenThu,setTuyenThu] = React.useState([{
    IDTuyenThu: 0,
    MaTuyenThu: "",
    TenTuyenThu: ""
  }]);
  const [NgaySearch , setNgaySearch] = useState({
    NgayBatDau : NgayMacDinh,
    NgayKetThuc : NgayMacDinh
  })
  // UseState nắm giữ giá trị trong mảng usestate giữ dữ liệu ở trên
  const[QuanHuyenNumber,setQuanHuyenNumber] = useState('');
  const[XaPhuongNumber,setXaPhuongnNumber] = useState('');
  const[KyThuNumber,setKyThuNumber] = useState('');
  const[TuyenThuNumber,setTuyenThuNumber] = useState('');
  
  
  

  useEffect(()=> {
    if(QuanHuyenNumber.length > 0 ){
      axios.get(`http://localhost:5199/api/ThongKe/getXaPhuongTheoQuanHuyen/${QuanHuyenNumber}`)
      .then(res => res.data)
      .then(res => setXaPhuong(res));
    }else{
      setXaPhuong([{
        IDXaPhuong : 0,
        TenXaPhuong : '',
        IDQuanHuyen :0,
        TenQuanHuyen : ''
      }])
      setXaPhuongnNumber('')
    }
   
  },[QuanHuyenNumber])




  var rows = []
  if(QuanHuyenNumber.length === 0 && XaPhuongNumber.length ===0 && KyThuNumber.length ===0 && TuyenThuNumber.length===0) 
  {
    datatemporary.map(element => {
      if(element.NgayThu === null){
        element.NgayThu = 'Chưa thu'
      }
      if(element.NgayThu.length >0 && element.NgayThu !== 'Chưa thu'){
        element.NgayThu = 'Đã thu'
      }
      rows.push(element);
    })
  }

  
  

  const [value, setValue] = React.useState(0);
  var Labelname = '';
  const listlabelname = 
  [
      'Nhập tên khách hàng cần tìm ...' , 
      'Nhập tên xã phường cần tìm ...' , 
      'Nhập tên tuyến thu cần tìm ...' ,
      'Nhập tên nhân viên cần tìm'

  ]
  const [chooseTypeSearch , setChooseTypeSearch] = useState(0);
  Labelname = listlabelname[chooseTypeSearch];
 








    function TablePaginationActions(props) {
        const theme = useTheme();
        const { count, page, rowsPerPage, onPageChange } = props;
      
        const handleFirstPageButtonClick = (event) => {
          onPageChange(event, 0);
        };
      
        const handleBackButtonClick = (event) => {
          onPageChange(event, page - 1);
        };
      
        const handleNextButtonClick = (event) => {
          onPageChange(event, page + 1);
        };
      
        const handleLastPageButtonClick = (event) => {
          onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };
      
        return (
          <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
              onClick={handleFirstPageButtonClick}
              disabled={page === 0}
              aria-label="first page"
            >
              {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
              onClick={handleBackButtonClick}
              disabled={page === 0}
              aria-label="previous page"
            >
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
              onClick={handleNextButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="next page"
            >
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
              onClick={handleLastPageButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="last page"
            >
              {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
          </Box>
        );
      }
      TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
      };


    //   Số trang
    const [page, setPage] = React.useState(0);
    //   Hiển thị số hàng trong 1 trang
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    // Số dòng hàng cuối
    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    //   SEt lại số trang để chuyển trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    // chưa rõ
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // style head table
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'var(--color3)',
        color: theme.palette.common.white,
        height: 65
        },
        [`&.${tableCellClasses.body}`]: {
        fontSize: 20,
        },
    }));
    

    

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

  

    return (
    <div>
    <Box display={'flex'} width={'100%'} height={'220px'} boxShadow='rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' marginTop={'30px'}
    borderRadius={'10px'} padding={'20px'} flexDirection='column'
    >
        <Box display={'flex'} width={'600px'} height={'58px'} justifyContent={'space-between'}> 
                <FormControl sx={{height: '100%', width: '30%'}}>
                <InputLabel id="demo-simple-select-label" sx={{height:'100%'}}>Tìm theo</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={chooseTypeSearch}
                    label="Tìm theo b"
                    onChange={(e)=> {setChooseTypeSearch(e.target.value)}}
                >
                    <MenuItem value={0}>Tên khách hàng</MenuItem>                   
                    <MenuItem value={1}>Tên xã phường</MenuItem>
                    <MenuItem value={2}>Tên tuyến thu</MenuItem>
                    <MenuItem value={3}>Tên nhân viên</MenuItem>
                </Select>
                </FormControl>

                <TextField sx ={{height:'100%',width:'65%'}} id="outlined-basic" label={Labelname}/>

        </Box>            

        <Box display={'flex'} width='100%' height={'100%'} flexDirection={'column'} marginTop={2} justifyContent={'space-around'}>
            
        
            <Box width={'100%'} display = 'flex'>
                
              <Box display = {'flex'} alignItems='center' >
                <TextField type={'date'} value={NgaySearch.NgayBatDau} 
                onChange={(e)=> {setNgaySearch({...NgaySearch,NgayBatDau : e.target.value})}}
                label="Bắt đầu" sx={{marginRight:'12px'}}

                // Chỗ này thiếu MIN day

                InputProps={{inputProps: {   max: NgayMacDinh} }}
                /> 
                   <ArrowRightAltIcon/>
                <TextField type={'date'} value={NgaySearch.NgayKetThuc}
                onChange={(e)=> {setNgaySearch({...NgaySearch,NgayKetThuc : e.target.value})}}
                label="Kết thúc" sx={{marginLeft:'12px'}}
                InputProps={{inputProps: { min : NgaySearch.NgayBatDau , max: NgayMacDinh} }}
                />
               
   
              </Box>
                {/* Quận huyện */}
                  <FormControl sx={{ m: 1, minWidth: 140 ,marginLeft: 2}}>
                  <InputLabel id="demo-simple-select-autowidth-label">Quận huyện</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={QuanHuyenNumber}
                    onChange={(e)=>{setQuanHuyenNumber(e.target.value)}}
                    autoWidth
                    label="Quận huyện b"
                  >

                   <MenuItem value={''}>
                     <em>None</em>
                   </MenuItem>

                   {QuanHuyen.map(element=> {
                      return(
                        <MenuItem key={element.IDQuanHuyen} value={element.TenQuanHuyen}> {element.TenQuanHuyen} </MenuItem>
                      )
                   })}
                    
                  </Select>
                  </FormControl>
                
                  {/* Xã phường */}

                  {QuanHuyenNumber.length > 0 ?  <FormControl sx={{ m: 1, minWidth: 130 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">Xã phường</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={XaPhuongNumber}
                    onChange={(e)=>{setXaPhuongnNumber(e.target.value)}}
                    autoWidth
                    label="Xã phường b"
                  >
                    
                  <MenuItem value={''}>
                  <em>None</em>
                </MenuItem>
                {XaPhuong.map(element=> {
                   return(
                     <MenuItem key={element.IDXaPhuong} value={element.TenXaPhuong}> {element.TenXaPhuong} </MenuItem>
                   )
                })}
                  </Select>
                  </FormControl> :''}
                  
                    {/* Kỳ thu */}
                  <FormControl sx={{ m: 1, minWidth: 130 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">Kỳ Thu</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={KyThuNumber}
                    onChange={(e)=>{setKyThuNumber(e.target.value)}}
                    autoWidth
                    label="Kỳ thu b"
                  >
                    <MenuItem value={''}>
                      <em>None</em>
                    </MenuItem>

                    {KyThu.map(element => {
                      return(
                        <MenuItem key={element.IDKyThu} value={element.TenKyThu}> {element.TenKyThu} </MenuItem>
                      )
                    })}
                  </Select>
                  </FormControl>

                    {/* Tuyến thu */}
                  <FormControl sx={{ m: 1, minWidth: 130 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">Tuyến thu</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={TuyenThuNumber}
                    onChange={(e)=>{setTuyenThuNumber(e.target.value)}}
                    autoWidth
                    label="tuyến thu b"
                  >
                  <MenuItem value={''}>
                  <em>None</em>
                  </MenuItem>

                    {TuyenThu.map(element => {
                      return(
                        <MenuItem key={element.IDTuyenThu} value={element.TenTuyenThu}> {element.TenTuyenThu} </MenuItem>
                      )
                    })}
                  </Select>
                  </FormControl>


             </Box>

             <Box width={'100%'} display='flex' justifyContent={'space-between'}>
             
                <Box>
                    <Box display='flex' alignItems={'center'} height={'100%'}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Đã thu" {...a11yProps(0)} />
                            <Tab label="Chưa thu" {...a11yProps(1)} />
                            <Tab label="Tất cả" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                </Box>
                
                <Button variant='outlined' color='success'> Xuất file excel </Button>
                 
             </Box>

        </Box>
        

    

    </Box>

    <Typography variant='h5' 
    sx=
    {{
        width:'100%',height:70,
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        color : 'var(--color3)',
        display : 'flex',
        paddingLeft: 3,
        alignItems : 'center'
    }}>DANH SÁCH KHÁCH HÀNG</Typography>

    <TableContainer component={Paper}  sx = {{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>

    <Table sx={{ maxWidth:'100%' }} aria-label="customized table">
    <TableHead>
        <TableRow>
        <StyledTableCell>MSKH</StyledTableCell>
        <StyledTableCell >Họ tên</StyledTableCell>
        <StyledTableCell >Quận huyện</StyledTableCell>
        <StyledTableCell >Tên tuyến thu</StyledTableCell>
        <StyledTableCell >Tên kỳ thu</StyledTableCell>
        <StyledTableCell >Trạng thái</StyledTableCell>
        </TableRow>
    </TableHead>
    

<TableBody>
  {(rowsPerPage > 0
    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : rows
  ).map((row) => (
    <TableRow key={row.name}>
      <TableCell component="th" scope="row">
        {row.MaKhachHang}
      </TableCell>
      <TableCell  >
        {row.HoTenKH}
      </TableCell>
      <TableCell  >
        {row.TenQuanHuyen}
     
      </TableCell>
      <TableCell component="th" scope="row" >
        {row.TenTuyenThu}
      </TableCell>
      <TableCell component="th" scope="row" >
        {row.TenKyThu}
      </TableCell>
      <TableCell  >
        {row.NgayThu}
      </TableCell>
    
     
    </TableRow>
  ))}
    
    

  {emptyRows > 0 && (
    <TableRow style={{ height: 53 * emptyRows }}>
      <TableCell colSpan={6} />
    </TableRow>
  )}
</TableBody>
<TableFooter>
  <TableRow>
    <TablePagination
      rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
      colSpan={3}
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      SelectProps={{
        inputProps: {
          "aria-label": "rows per page"
        },
        native: true
      }}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    />
  </TableRow>
</TableFooter>
</Table>
</TableContainer>  
    
    
    
    </div>
  )
}

export default CustomerStatistical