import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};


const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { phieuthu: ws }, SheetNames: ["phieuthu"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const phieuthu = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(phieuthu, fileName + fileExtension);
};

export default function ExportReceiptList({phieuthu}) {

    const [open, setOpen] = React.useState(false);


    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    const handleSubmit = () => {
        exportToCSV(handleExportCustomer(phieuthu), 'phieuthu');
        handleClose()
    };

    function getFormattedDate(date) {
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        return day + '/' + month + '/' + year;
    }

    const handleExportCustomer = function (PhieuThu) {
        var chosenExportCustomers = [];
        if (PhieuThu.length > 0) {
            PhieuThu
                .map(function (phieu) {
                    console.log(phieu.IDPhieu);
                    var chosenExportCustomer = {
                        "ID Phieu": phieu.IDPhieu,
                        "Tên Khách Hàng": phieu.HoTenKH,
                        "Tuyến Thu": phieu.TenTuyenThu,
                        "Kỳ Thu": phieu.TenKyThu,
                        "Tên Nhân Viên": phieu.HoTen,
                        "Mẫu số phiếu": phieu.MauSoPhieu,
                        "Ngày tạo": getFormattedDate(new Date(phieu.NgayTao)),
                        "Ngày thu": getFormattedDate(new Date(phieu.NgayThu)),
                    }
                    chosenExportCustomers.push(chosenExportCustomer)
                }
                )
        }
        return (chosenExportCustomers)
    }

    return (
        <div>
            <Stack direction="column" spacing={10} alignItems="flex-end" >
                <Button variant="contained" onClick={handleOpen} sx={{marginBottom:2, backgroundColor: 'var(--color7)' }}>Xuất File Excel</Button>
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="post-request-error-handling" variant="h5" style={{ paddingBottom: 20 }}>
                        Xác Nhận Xuất File Excel
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-evenly" marginTop={3}>
                        <Button variant="contained" onClick={handleSubmit}>Xác Nhận</Button>
                        <Button variant="contained" onClick={handleClose}>Huỷ</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}
