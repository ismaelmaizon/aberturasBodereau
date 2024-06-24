import { DataGrid } from '@mui/x-data-grid';
//import { useDemoData } from '@mui/x-data-grid-generator';
import { useContext, useEffect, useState } from 'react';
import { MiContexto } from '../context/context';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Productos() {

    const {
        productos, getProductos 
    } = useContext(MiContexto)

    const tipos = ['Tipo1','Tipo2','Tipo3','Tipo4','Tipo4','Tipo5','Tipo6','Tipo7','Tipo8',];
    
    const [tipo, setTipo] = useState('');
    const handleChange = (event) => {
        setTipo(event.target.value);
        filtrarTipo(event.target.value)
    };


    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([
        { field: 'col1', headerName: 'Tipo', width: 150 },
        { field: 'col2', headerName: 'Descripcion', width: 150 },
        { field: 'col3', headerName: 'Alto', width: 150 },
        { field: 'col4', headerName: 'Ancho', width: 150 },
        { field: 'col5', headerName: 'Derc', width: 150 },
        { field: 'col6', headerName: 'Izq', width: 150 },
        { field: 'col7', headerName: 'stock', width: 150 },
        { field: 'col8', headerName: 'PrecioUnidad', width: 150 },
    ])

    const filtrarTipo = (value) =>{
        //getProductos()
        let prods = []
        productos.map((prod)=>{ 
            console.log(prod.id);
            if (value == prod.Tipo) {
                let newProd = {
                    id: prod.id, 
                    col1: prod.Tipo, 
                    col2: prod.Descripcion,
                    col3: prod.Alto,
                    col4: prod.Ancho,
                    col5: prod.Derc,
                    col6: prod.Izq,
                    col7: prod.stock,
                    col8: prod.Precio_U
                }
                prods.push(newProd)
            }
        })
        setRows(prods)
    }
    
    useEffect(()=>{
        getProductos()
        let prods = []
        productos.map((prod)=>{ 
            console.log(prod.id);
            let newProd = {
                id: prod.id, 
                col1: prod.Tipo, 
                col2: prod.Descripcion,
                col3: prod.Alto,
                col4: prod.Ancho,
                col5: prod.Derc,
                col6: prod.Izq,
                col7: prod.stock,
                col8: prod.Precio_U
            }
            prods.push(newProd)
        })
        setRows(prods)
        
    }, [])

    return (
        <div style={{ height: 350, width: '90%', margin: 'auto', marginTop: '15px' }}>
            <Grid container direction="row" justifyContent="flex-start" alignItems="baseline" >
                <FormControl sx={{ m: 1, width: 200 }}>
                    <InputLabel id="demo-select-small-label">Tipo</InputLabel>
                    <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={tipo}
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    >
                    {tipos.map((name, index) => (
                        <MenuItem
                        key={index}
                        value={name}
                        >
                        {name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <Button variant="contained"  sx={{ padding: '15px' }} endIcon={<AddIcon />}>info</Button>
            </Grid>
            <DataGrid sx={{height: '500px'}} rows={rows} columns={columns}  />
        </div>
    );
}