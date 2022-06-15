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
                path :'phieuthu'
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
                title : 'Quản lý nhân viên',
                path :'/home/employee'
            },
            {
                title : 'Quản lý khách hàng',
                path :'/home/customer'
            },          
            {
                title : 'Quản lý Kỳ thu',
                path :'/home/kythu'
            },
            {
                title : 'Quản lý phiếu thu',
                path :'/home/receipt'
            },
            {
                title : 'Quản lý tuyến thu',
                path :''
            },
            {
                title : 'Phân quyền nhân viên',
                path :''
            },
            {
                title : 'Phân tuyến thu',
                path :''
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
                title : 'Danh sách khách hàng',
                path :''
            },
            {
                title : 'Danh sách phiếu thu',
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
                title : 'Thống kê',
                path :''
            }
        ]
    },
    

]




export {QuyenChung,};