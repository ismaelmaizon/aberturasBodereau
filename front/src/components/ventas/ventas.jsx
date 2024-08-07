import { DataGrid } from '@mui/x-data-grid';
//import { useDemoData } from '@mui/x-data-grid-generator';
import { useContext, useEffect, useState } from 'react';
import { MiContexto } from '../context/context';
import { Autocomplete, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SearchIcon from '@mui/icons-material/Search';

/*
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};*/

export default function Ventas() {

    const {
        vprod, setVprod, vent, setVent,
        ventas, getVentas, getProductos,
        getVenta,
        refresh
    } = useContext(MiContexto)

    const [rows, setRows] = useState([])
    //producto    
    const [ventid, setVentid] = useState('')
    const handleChangeProd = (event) => {
        console.log(event.target.innerText)
        setVentid(event.target.innerText)
    }
    const [ids, setids] = useState([])

    const columns = [
        { field: 'col0', headerName: 'id_venta', width: 150 },
        { field: 'col1', headerName: 'Fecha', width: 150 },
        { field: 'col2', headerName: 'Nombre', width: 150 },
        { field: 'col3', headerName: 'Apellido', width: 150 },
        { field: 'col4', headerName: 'Mail', width: 150 },
        { field: 'col5', headerName: 'Cel', width: 150 },
        { field: 'col6', headerName: 'Total', width: 150 }
    ]

    //modificar vista
    const modiVista = async (view) =>{
        if (view == 'ventas') {
            await getVentas()
            setVent(true)
            setVprod(false)
        }else{
            await getProductos()
            setVprod(true)
            setVent(false)
        }
    }
    
    

    useEffect(()=>{
        let vents = []
        let ids = []
        ventas.map((cliente)=>{ 
            console.log(cliente.id_venta);
            let id = { label: cliente.id_venta }
            let newCliente = {
                id: cliente.id,
                col0: cliente.id_venta, 
                col1: cliente.fecha, 
                col2: cliente.nombre,
                col3: cliente.apellido,
                col4: cliente.mail,
                col5: cliente.cel,
                col6: cliente.total
            }
            vents.push(newCliente)
            ids.push(id)
        })
        setRows(vents)
        setids(ids)
        
    }, [])

    return (
        <div style={{ height: 350, width: '90%', margin: 'auto', marginTop: '15px' }}>
            <Grid container direction='row' gap={2} >
                <Button variant="contained"  sx={{ padding: '15px' }} endIcon={<RotateLeftIcon />} onClick={()=>{refresh()}}>refresh</Button>
                <Button variant="contained"  sx={{ padding: '15px' }} endIcon={<RotateLeftIcon />} onClick={()=>{modiVista('productos')}}>productos</Button>
            </Grid>            
            <Grid sx={{ display: { xs: 'none', md: 'grid', gridTemplateColumns: `repeat(6, 1fr)`, alignItems:'center'},  gap: '5px' }} container>
                
                <Grid item xs={6}>
                    <FormControl sx={{ marginTop: '25px' , width: '100%', paddingBottom: '25px'}}>
                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={ids}
                    sx={{ width: 200 }}
                    onChange={handleChangeProd}
                    renderInput={(params) => <TextField {...params} label="ID's" />}
                    />  
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained"  sx={{padding: '10px' }} endIcon={<SearchIcon />} onClick={ async ()=>{ 
                        let res = await getVenta(ventid)
                        console.log(res);
                        }} >buscar</Button>
                </Grid>
            </Grid>
            {/********************* */ }
            <Grid sx={{ display: { xs: 'grid', md: 'none' } }} container direction="column" justifyContent="flex-start" alignItems="center" >
                
                <Grid item xs={2}>
                    <Button variant="contained"  sx={{padding: '10px', marginBottom: '15px'}} endIcon={<SearchIcon />} onClick={async()=>{ 
                        
                        }} >bcar</Button>
                </Grid>
            </Grid>
            <DataGrid sx={{height: '500px'}} rows={rows} columns={columns}  />
        </div>
    );
}