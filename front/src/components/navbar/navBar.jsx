import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Fragment, useContext, useEffect, useState } from 'react';
import { MiContexto } from '../context/context';
import { Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AddHomeIcon from '@mui/icons-material/AddHome';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import BackupIcon from '@mui/icons-material/Backup';
import AssignmentIcon from '@mui/icons-material/Assignment';
//import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
const ITEM_HEIGHT = 48;


export default function NavBar() {
    const {lugares} = useContext(MiContexto)

    //despliegue
    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };    
    const links = [
      {text: 'Agregar Producto', url: '/addproducto', icon: AddIcon },
      {text: 'Actualizar Producto', url: '/', icon: BackupIcon },
      {text: 'Eliminar Producto', url: '/', icon: DeleteIcon },
      {text: 'Modificar Stock', url: '/', icon: AssignmentIcon }
    ]
  
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {links.map((link, index) => {
            const Icon = link.icon
            return(
            <ListItem key={index} disablePadding>
              <Link to = {link.url} >
                <ListItemButton >
                  <ListItemIcon>
                     <Icon/>
                  </ListItemIcon>
                  <ListItemText primary={link.text} />
                </ListItemButton>
              </Link>  
            </ListItem>)
          })}
        </List>
      </Box>
    );

    //Boton lugares
    const listLug = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {lugares.map((lug, index) => {
            return(
            <ListItem key={index} disablePadding>
              <Link >
                <ListItemButton >
                  <ListItemIcon>
                     <AddHomeIcon/>
                  </ListItemIcon>
                  <ListItemText primary={lug.fullname}/>
                </ListItemButton>
              </Link>  
            </ListItem>)
          })}
        </List>
      </Box>
    );
    
    //3 puntos
    const [optionsLug, setOptionsLug] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);
    const handleClickPuntos = (event) => {
        console.log(event.currentTarget);
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    //////////////
    
    useEffect(()=>{
        let options = []
        lugares.map((lu)=>{
            options.push(lu.fullname)
        })
        setOptionsLug(options)
    }, [anchorEl])



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div>
              <Fragment>
                <Button sx={{color:'white'}} onClick={toggleDrawer('left', true)}><DensityMediumIcon/></Button>
                <Drawer
                  anchor={'left'}
                  open={state['left']}
                  onClose={toggleDrawer('left', false)}
                >
                  {list('left')}
                </Drawer>
              </Fragment>
          </div>
          <Link to='/' >
            <Typography
              variant="h6"
              noWrap
              component="div"
              color={'white'}
            >
                  Aberturas Bodereau
            </Typography>
          </Link>
          
          <Box sx={{ flexGrow: 1 }} /> {/* sirve para generar el espacio */ }
            <div>
                <Fragment>
                  <Button sx={{color:'white'}} onClick={toggleDrawer('right', true)}><AddHomeIcon/></Button>
                  <Drawer
                    anchor={'right'}
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}
                  >
                    {listLug('right')}
                  </Drawer>
                </Fragment>
            </div>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}  >
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClickPuntos}
                    >
                    <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                        'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                        }}
                    >
                        {optionsLug.map((option) => (
                        <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                            {option} <AddHomeIcon/>
                        </MenuItem>
                        ))}
                    </Menu>
            </Box>
        </Toolbar>
      </AppBar>
      {/*renderMobileMenu*/}
      {/*renderMenu*/}
    </Box>
  );
}