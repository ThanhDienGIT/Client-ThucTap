const QuyenChung = [
     
    {
        // Quyen Chung
        id:4,
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
        id:1,
        icon : 'fi fi-rr-address-book',
        title : "QUẢN TRỊ VIÊN",
        // Chức năng
        child : [
            {
                title : 'Danh sách nhân viên',
                path :''
            },
            {
                title : 'Danh sách khách hàng',
                path :'/home/customer'
            },
        ]
    },
    {
        // Thu tien
        id:2,
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
        id:3,
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

]




export {QuyenChung,};