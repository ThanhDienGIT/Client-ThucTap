const QuyenChung = [
     
    {
        // Quyen Chung
        id:1,
        icon : 'fi fi-rr-layout-fluid',
        title : "TRANG CHÍNH",
        // Chức năng
        child : [
            {
                title : 'Thống kê',
                path :'/home/statistical'
            },
            {
                title : 'Xem phiếu thu',
                path :''
            },     
        ]
    },
    {
        // Quan Tri vien
        id:2,
        icon : 'fi fi-rr-address-book',
        title : "QUẢN TRỊ VIÊN",
        // Chức năng
        child : [
            {
                title : 'Danh sách nhân viên',
                path :'/home/staff'
            },
            {
                title : 'Danh sách khách hàng',
                path :''
            },
        ]
    },
    {
        // Thu tien
        id:3,
        icon : 'fi fi-rr-dollar',
        title : "NHÂN VIÊN THU TIỀN",
        // Chức năng
        child : [
            {
                title : 'Xem phiếu thu',
                path :''
            },
            
        ]
    },
    {
        // Báo cáo thống kê
        id:4,
        icon : 'fi fi-rr-chart-pie',
        title : "BÁO CÁO THỐNG KÊ",
        // Chức năng
        child : [
            {
                title : 'Tạo báo cáo',
                path :''
            }
        ]
    },
    {
        // Phiếu Thu
        id:5,
        icon : 'fi fi-rr-chart-pie',
        title : "QUẢN LÝ PHIẾU THU",
        // Chức năng
        child : [
            {
                title : 'Danh sách phiếu thu',
                path :'/home/receipt'
            }
        ]
    },

]




export {QuyenChung,};