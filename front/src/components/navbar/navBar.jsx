import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useEffect, useState } from 'react';
import { MiContexto } from '../context/context';
import { Button } from '@mui/material';
import AddHomeIcon from '@mui/icons-material/AddHome';
import MoreVertIcon from '@mui/icons-material/MoreVert';




const ITEM_HEIGHT = 48;


export default function NavBar() {
    const {lugares} = useContext(MiContexto)
     
    const [optionsLug, setOptionsLug] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        console.log(event.currentTarget);
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    //////////////
    
    const contLug = lugares.length

    console.log(lugares);

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
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Aberturas Bodereau
          </Typography>
          
          <Box sx={{ flexGrow: 1 }} /> {/* sirve para generar el espacio */ }
            <Box sx={{ 
                    width: '30%', borderRadius: '15px',
                    display: { xs: 'none', md: 'grid' }, gridTemplateColumns: `repeat(${contLug}, 1fr)`, gap: '5px'
                    }}  >
                    {
                    lugares.map((lug, index)=>{
                        console.log(index);
                        return (
                            <Button key={index} variant="contained" size="small" style={{ backgroundColor: '#ab47bc' }} startIcon={<AddHomeIcon/>} >
                                {lug.fullname}                                
                            </Button>
                        )
                    })
                }
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}  >
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
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