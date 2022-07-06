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
import { Box, Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, Tab, Tabs, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';
import ReplayIcon from '@mui/icons-material/Replay';

function TurnoverStatistical() {
  
    var rows = []


    const [value, setValue] = React.useState(2);
   //   Số trang
   const [page, setPage] = React.useState(0);
   //   Hiển thị số hàng trong 1 trang
   const [rowsPerPage, setRowsPerPage] = React.useState(50);
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
  
  
  
  
  
  return (
    <div>
          {/* Box tổng */}
      <Box display={'flex'} width={'100%'} height={'220px'} boxShadow='rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' marginTop={'30px'}
      borderRadius={'10px'} padding={'20px'} flexDirection='column'>
            {/* Thanh Tìm text */}
          <Box display={'flex'} width={'600px'} height={'58px'} justifyContent={'space-between'}>








              
          </Box>  
            {/* Các lựa chọn lọc theo ngày đến ngày xã phường quận huyện ... */}
            <Box display={'flex'} width='100%' height={'100%'} flexDirection={'column'} marginTop={2} justifyContent={'space-around'}>
              
                  <Box width={'100%'} display='flex' alignItems={'center'}>
                          {/* Từ ngày đến ngày */}
                        <Box width={'100%'} display='flex' alignItems={'center'}>
                        
                        
                        </Box>
                        {/* các select khác */}
                  
                  
                  </Box>   
                  <Box width={'100%'} display='flex' justifyContent={'space-between'}>
                      <Box>
                      
                      </Box>
                      <Box height={"100%"} width={350} display={'flex'} justifyContent='space-around' alignItems={'center'}>

                      <Button variant="outlined" color='success' endIcon={<SearchIcon />} sx={{ height: '100%', marginLeft: 2 }}
                        
                      >
                        Tìm kiếm
                      </Button>
                      <Button variant='outlined' color='success'> Xuất file excel </Button>
                      </Box>

                  </Box>
                  

            </Box>    
      </Box>
      <Typography variant='h5'
        sx=
        {{
          width: '100%', height: 70,
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          color: 'var(--color3)',
          display: 'flex',
          paddingLeft: 3,
          alignItems: 'center'
        }}>DANH SÁCH DOANH THU THEO TUYẾN THU</Typography>


      <Box witdh={'100%'} height={800}>

        <TableContainer component={Paper} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>

          <Table sx={{ maxWidth: '100%' }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>MSTT</StyledTableCell>
                <StyledTableCell >Tên tuyến thu</StyledTableCell>
                <StyledTableCell >MSNV</StyledTableCell>
                <StyledTableCell >Tên nhân viên</StyledTableCell>
                <StyledTableCell >Kỳ thu</StyledTableCell>
                <StyledTableCell >Doanh Thu</StyledTableCell>
              </TableRow>
            </TableHead>


            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                  MaKhachang
                  </TableCell>
                  <TableCell  >
                  HoTenKH
                  </TableCell>
                  <TableCell  >
                  TenQuanuyen

                  </TableCell>
                  <TableCell  >
                  TenXaPhong

                  </TableCell>
                  <TableCell component="th" scope="row" >
                  TenTuyeThu
                  </TableCell>
                  <TableCell component="th" scope="row" >
                  TenKyTh
                  </TableCell>

                  <TableCell sx={{ color: 'var(--color7)' }} >
                  NgayThu
                  </TableCell>
             
                    

                </TableRow>
              ))}



              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter >
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 50, 100, 200, { label: "All", value: -1 }]}
                  colSpan={5}
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

      </Box>

              
    </div>



  )
}

export default TurnoverStatistical