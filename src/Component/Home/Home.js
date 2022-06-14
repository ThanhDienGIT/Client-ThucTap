import * as React from 'react';
import { useState ,useContext} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import '../../CSS/home.css'
import { QuyenChung } from './HomeMenuData'
import logo from '../../image/Logo.jpg';
import { Link, Outlet } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import HomeHeader from './HomeHeader';
import { GetCookie , cookie , BreakCookie} from '../Cookie/CookieFunc';
import { LoginContext } from '../LoginContext/LoginContext';
import axios from 'axios';
function Home() {
 
  // Chiều dài của menu
  const drawerWidth = 260;
  // đặt lại nội dung sau khi mở
  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

  // Đặt lại chiều dài của AppBar
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  //  CSS cho item bên trong menu
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

    // UseState dùng để đóng mở form
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const theme = useTheme();

  const [mountBox , setMountBox] = useState(false);


    const [infostaff,setInfostaff] = useState([{
      CCCD: "092300003871",
      DiaChi: "Xuân Khánh ,Ninh Kiều, Cần Thơ",
      Email: "vanba1992@gmail.com",
      GioiTinh: "Nam",
      HoTen: "Nguyễn Văn Ba",
      IDNhanVien: 1,
      MaNhanVien: "NV0001",
      MatKhau: "123456",
      NgaySinh: "1992-04-24T00:00:00",
      SoDienThoai: "0917562368",
      TaiKhoan: "nvba0001",
    }])

    const [mastership , setMastership] = useState([{
      IDNhanVien: 0,
      IDQuyen: 0
    }])
    // Xử lý logic

    GetCookie(document.cookie);
    const ArrayMasterShip = [];
    const ArrayMapMasterShip = [
      {id:4,
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
      ]}];
    mastership.map(element => {
      ArrayMasterShip.push(element.IDQuyen);
    })
    if(ArrayMasterShip.length===0){
      BreakCookie(cookie)
      alert("Nhân viên không có quyền")
      window.location.reload();
    }

   

    
    for(let i=0;i<QuyenChung.length;i++){
        for(let j=0;j<ArrayMasterShip.length;j++){
            if(QuyenChung[i].id === ArrayMasterShip[j]){
              ArrayMapMasterShip.push(QuyenChung[i]);
            }
        }
    }

  
    React.useEffect(()=> {
        axios.get(`http://localhost:5199/api/Login/getinfobyID/${cookie}`) 
          .then(res=>res.data)
          .then(res=>
            {
              setInfostaff(res);
              axios.get(`http://localhost:5199/api/Login/getmastership/${cookie}`) 
              .then(res=>res.data)
              .then(res=> setMastership(res)) 
            })
    },[cookie])
    
    
    
    
    

    
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
       {/* Header */}
        <Toolbar  
          sx= {
            {
              display : 'flex',
              justifyContent : 'space-between',
              alignItems : 'center',
              backgroundColor : 'var(--color3)'
            }
          }
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Công ty môi trường SHIZEN
          </Typography>
          {/* Avatar */}
       <div style={{display:'flex'}}>

         
         
          {/* Avatar nhân viên */}
       <Avatar alt="Remy Sharp" src="https://hinhnen123.com/wp-content/uploads/2021/06/avatar.jpg" 
       sx= {
         {
           border : "1px outset white"
         }
       }
       />
 {/* Tên nhân viên */}
        <Typography variant="p" noWrap component="div" 
        sx = {{
          marginLeft : 2,
          display : "flex",
          justifyContent : 'center',
          alignItems : 'center',
         
        }}
      >
          {infostaff[0].HoTen}
      </Typography>
          
            <Box 
            sx= {
              {
                width: 'auto',
                height: 'auto',   
                position : 'relative',
              }
            }
            >
                <IconButton onClick={()=> {setMountBox(!mountBox)}}
                sx={{marginLeft:2}}
                >
                  <MenuIcon 
                  sx={{color:'white'}}
                  /> 
                </IconButton>
                
              {mountBox && <HomeHeader/> }  

            </Box>
            
        </div>
          
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },

        }}
        variant="persistent"
        anchor="left"
        open={open}
      >

        <DrawerHeader
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: '35px',
            paddingRight: '10px'
          }}>
          <img src={logo} alt='Logo' style={{ width: '50px' }} />

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {
          ArrayMapMasterShip.map(item => (
            // List
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              key={item.id}
            >
              {/* UL */}
              <ListItem disablePadding
                sx={{ color: "var(--color2)" }}
              >

                {/* Icon */}
                <ListItemIcon
                  sx={{
                    marginLeft: '15px',
                  }}>
                  <i className={item.icon}></i>
                </ListItemIcon>

                {/* Text */}
                <ListItemText primary={item.title}/>
              </ListItem>
              {/* LI */}
              {item.child.map(itemchild => (
                <Link to={itemchild.path} className="Home__Link" key={itemchild.title}>
                  <ListItem disablePadding >
                    <ListItemButton>
                      <ListItemText inset primary={itemchild.title} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
              <Divider />

            </List>

          ))
        }
      </Drawer>
      {/* Content */}

      <Main open={open} >
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  )
}

export default Home