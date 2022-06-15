import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ReceiptDetailModal from './ReceiptDetailModal';
import ReceiptAddModal from './ReceiptAddModal';
import '../../CSS/App.css';
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
  const [rows, setRows] = React.useState([]);
  const [updateState, setUpdateState] = React.useState(true); //state reRender
  // change tt
  function change(date) {
    if (!date) {
      return 'Chưa thu';
    } else {
      return 'Đã thu';
    }

  }
  //get
  React.useEffect(() => {
    fetch("http://localhost:5199/api/PhieuThu")
        .then(response => response.json())
        .then(function (PhieuThu) {
          setRows(PhieuThu);
        },
          
            (error) => {
                alert('Failed');
            })
  }, [updateState])
//hadle delete
const reRender = () => setUpdateState(!updateState);
const handleDelete = (id) => {
  if (window.confirm('Xoá kỳ thu sẽ xoá theo các phiếu thu của kỳ thu tương ứng. Bạn có chắc chắn muốn xoá ?')) {
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
  
  return (
    <div>
      <ReceiptAddModal />
      <br></br>
      <hr></hr>
      <br></br>
      {/* list */}
      <div><h2>Danh sách phiếu thu</h2></div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Mã Phiếu thu</StyledTableCell>
            <StyledTableCell align="left">Tên khách hàng</StyledTableCell>
            <StyledTableCell align="left">Loại khách hàng</StyledTableCell>
            <StyledTableCell align="left">Nhân viên thu</StyledTableCell>
            <StyledTableCell align="left">Trạng thái</StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.IDPhieu}>
              <StyledTableCell component="th" scope="row">
              {row.IDPhieu}
              </StyledTableCell>
              <StyledTableCell align="left">{row.HoTenKH}</StyledTableCell>
              <StyledTableCell align="left">{row.TenLoai}</StyledTableCell>
              <StyledTableCell align="left">{row.HoTen}</StyledTableCell>
              <StyledTableCell id="tt" align="left">{ change(row.NgayThu) }</StyledTableCell>

              {/* function */}
              
              <StyledTableCell align="left" padding='none'>
                <Button sx={{fontSize:12,display: "flex", justifyContent: "flex-end"}} variant="outlined" color="primary" >Xác nhận</Button>
              </StyledTableCell>
              <StyledTableCell align="left" padding='none'>
                <Button onClick={() => handleDelete(row.IDPhieu)} sx={{display: "flex", justifyContent: "flex-end"}} variant="outlined" color="error" startIcon={<DeleteIcon sx={{ fontSize: "80px" }} />} ></Button>
              </StyledTableCell>
              <StyledTableCell align="left" padding='none'>
                <ReceiptDetailModal receipt={row} />
              </StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default ReceiptList