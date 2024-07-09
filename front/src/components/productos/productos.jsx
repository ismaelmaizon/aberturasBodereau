import { DataGrid } from '@mui/x-data-grid';
//import { useDemoData } from '@mui/x-data-grid-generator';
import { useContext, useEffect, useState } from 'react';
import { MiContexto } from '../context/context';
import { Autocomplete, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SearchIcon from '@mui/icons-material/Search';

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
        lugares,
        productos, setProducto,
        getUbiProducto,
        filtrarTipoLadoLug, rows, setRows,
        refresh,
        lug, setLug, lado, setLado, tipo, setTipo
    } = useContext(MiContexto)

    //set lugares
    const [lugs, setLugs] = useState([])
    const state = () =>{
        let lu = []
        lugares.map((l)=>{
            lu.push(l)
        })
        setLugs(lu)
    }
    const handleChangeLug = (event) => {
        console.log(event.target.value)
        setLug(event.target.value)
    }
    
    
    //producto    
    const [prod, setProd] = useState('')
    const handleChangeProd = (event) => {
        console.log(event.target.innerText)
        setProd(event.target.innerText)
    }

    //set lado
    const lados = ['Izq','Derc']    
    const handleChangeLado = (event) => {
        console.log(event.target.value)
        setLado(event.target.value)
    }

    //set tipos
    const tipos = ['Tipo1','Tipo2','Tipo3','Tipo4','Tipo4','Tipo5','Tipo6','Tipo7','Tipo8',]    
    const handleChange = (event) => {
        setTipo(event.target.value)
    }

    const [ids, setids] = useState([])

    const columns = [
        { field: 'col0', headerName: 'ID', width: 150 },
        { field: 'col1', headerName: 'Tipo', width: 150 },
        { field: 'col2', headerName: 'Descripcion', width: 150 },
        { field: 'col3', headerName: 'Alto', width: 150 },
        { field: 'col4', headerName: 'Ancho', width: 150 },
        { field: 'col5', headerName: 'Derc', width: 150 },
        { field: 'col6', headerName: 'Izq', width: 150 },
        { field: 'col7', headerName: 'stock', width: 150 },
        { field: 'col8', headerName: 'PrecioUnidad', width: 150 }
    ]
    
    

    useEffect(()=>{
        state()
        let prods = []
        let ids = []
        productos.map((prod)=>{ 
            console.log(prod.id);
            console.log(prod.IdGenerate);
            let id = { label: prod.IdGenerate }
            let newProd = {
                id: prod.id,
                col0: prod.IdGenerate, 
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
            ids.push(id)
        })
        setRows(prods)
        setids(ids)
        
    }, [])

    return (
        <div style={{ height: 350, width: '90%', margin: 'auto', marginTop: '15px' }}>
            <Button variant="contained"  sx={{ padding: '15px' }} endIcon={<RotateLeftIcon />} onClick={()=>{refresh()}}>refresh</Button>
            <Grid sx={{ display: { xs: 'none', md: 'grid', gridTemplateColumns: `repeat(6, 1fr)`, alignItems:'center'} }} container>
                <Grid item xs={6}>
                    <FormControl sx={{ marginTop: '25px' , width: '100%', paddingBottom: '25px'}}>
                                <InputLabel id="demo-select-small-label" sx={{ fontSize: '15px' }} variant='outlined' >Tipo</InputLabel>
                                <Select
                                sx={{height:'100%'}}
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={tipo}
                                onChange={handleChange}
                                MenuProps={MenuProps}
                                style={{width: '250px'}}
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
                </Grid>
                <Grid item xs={6}>
                    <FormControl sx={{ marginTop: '25px' , width: '100%', paddingBottom: '25px'}}>
                                <InputLabel id="demo-select-small-label">Lado</InputLabel>
                                <Select
                                sx={{height:'100%'}}
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={lado}
                                onChange={handleChangeLado}
                                MenuProps={MenuProps}
                                style={{width: '250px'}}
                                >
                                {lados.map((name, index) => (
                                    <MenuItem
                                    key={index}
                                    value={name}
                                    >
                                    {name}
                                    </MenuItem>
                                ))}
                                </Select>    
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl sx={{ marginTop: '25px' , width: '100%', paddingBottom: '25px'}}>
                                <InputLabel id="demo-select-small-label">Lugar</InputLabel>
                                <Select
                                sx={{height:'100%'}}
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={lug}
                                onChange={handleChangeLug}
                                MenuProps={MenuProps}
                                style={{width: '250px'}}
                                >
                                {lugs.map((name, index) => (
                                    <MenuItem
                                    key={index}
                                    value={name.id}
                                    >
                                    {name.fullname}
                                    </MenuItem>
                                ))}
                                </Select>    
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained"  sx={{padding: '10px' }} endIcon={<SearchIcon />} onClick={()=>{ filtrarTipoLadoLug(tipo, lado, lug) }} >filtrar</Button>
                </Grid>
                <Grid item xs={2}>
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
                <Grid item xs={2}>
                    <Button variant="contained"  sx={{padding: '10px' }} endIcon={<SearchIcon />} onClick={()=>{ setProducto([]), getUbiProducto(prod)}} >buscar</Button>
                </Grid>
            </Grid>
            {/********************* */ }
            <Grid sx={{ display: { xs: 'grid', md: 'none' } }} container direction="column" justifyContent="flex-start" alignItems="center" >
                <Grid item xs={2}>
                    <FormControl sx={{ marginTop: '25px' , width: '100%', paddingBottom: '25px'}}>
                                <InputLabel id="demo-select-small-label">Tipo</InputLabel>
                                <Select
                                sx={{height:'50px'}}
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={tipo}
                                onChange={handleChange}
                                MenuProps={MenuProps}
                                style={{width: '200px'}}
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
                </Grid>
                <Grid item xs={2}>
                    <FormControl sx={{ marginTop: '25px' , width: '100%', paddingBottom: '25px'}}>
                                <InputLabel id="demo-select-small-label">Lado</InputLabel>
                                <Select
                                sx={{height:'50px'}}
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={lado}
                                onChange={handleChangeLado}
                                MenuProps={MenuProps}
                                style={{width: '200px'}}
                                >
                                {lados.map((name, index) => (
                                    <MenuItem
                                    key={index}
                                    value={name}
                                    >
                                    {name}
                                    </MenuItem>
                                ))}
                                </Select>    
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained"  sx={{padding: '10px' }} endIcon={<SearchIcon />} onClick={()=>{ filtrarTipoLadoLug(tipo, lado, lug) }} >filtrar</Button>
                </Grid>
                <Grid item xs={2}>
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
                <Grid item xs={2}>
                    <Button variant="contained"  sx={{padding: '10px', marginBottom: '15px'}} endIcon={<SearchIcon />} onClick={()=>{ setProducto([]), getUbiProducto(prod)}} >buscar</Button>
                </Grid>
            </Grid>
            <DataGrid sx={{height: '500px'}} rows={rows} columns={columns}  />
        </div>
    );
}

/*
    const filtrarTipoLadoLug = async (tipo, lado, lug) =>{
        setRows([])
        console.log(lug);
        console.log(tipo);
        console.log(lado);
        let prods = []
        
        if(!tipo && !lado){
            const response = await getProductosLugar(lug)
            setProductsLug(response)
            console.log(productsLug);
            productsLug.map((prodlug)=>{
                productos.map((prod)=>{
                    if(prodlug.id_producto == prod.id){
                        let newProd = {
                            id: prod.id,
                            col0: prod.IdGenerate, 
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
            })
            setRows(prods)
            console.log('filtrar solo por lugar');
        }else if(!lado && !lug){
            productos.map((prod)=>{
                console.log(prod);
                if(tipo == prod.Tipo){
                    let newProd = {
                        id: prod.id,
                        col0: prod.IdGenerate, 
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
            console.log('filtrar solo tipo');
        }else if(!tipo && !lug  ){
            productos.map((prod)=>{
                console.log(prod);
                if(lado == 'Derc' && prod.Derc == 1){
                    let newProd = {
                        id: prod.id,
                        col0: prod.IdGenerate, 
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
                }else if (lado == 'Izq' && prod.Izq == 1){
                    let newProd = {
                        id: prod.id,
                        col0: prod.IdGenerate, 
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
            console.log('filtrar solo lado');
        }else if( tipo && lug ) {
            const response = await getProductosLugar(lug)
            setProductsLug(response)
            console.log(productsLug);
            productsLug.map((prodlug)=>{
                productos.map((prod)=>{
                    if(prodlug.id_producto == prod.id && tipo == prod.Tipo){
                        let newProd = {
                            id: prod.id,
                            col0: prod.IdGenerate, 
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
            })
            setRows(prods)
            console.log('filtrar lugar y tipo');
        }else if( lado && lug ){
            const response = await getProductosLugar(lug)
            setProductsLug(response)
            console.log(productsLug);
            productsLug.map((prodlug)=>{
                productos.map((prod)=>{
                    if(lado == 'Derc' && prod.Derc == 1 && prodlug.id_producto == prod.id){
                        let newProd = {
                            id: prod.id,
                            col0: prod.IdGenerate, 
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
                    }else if(lado == 'Izq' && prod.Izq == 1 && prodlug.id_producto == prod.id){
                        let newProd = {
                            id: prod.id,
                            col0: prod.IdGenerate, 
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
            })
            setRows(prods)
            console.log('fitrar lado y lugar');
        }else if( tipo && lado ){
            productos.map((prod)=>{
                console.log(prod);
                if(lado == 'Derc' && prod.Derc == 1 && tipo == prod.Tipo){
                    let newProd = {
                        id: prod.id,
                        col0: prod.IdGenerate, 
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
                }else if (lado == 'Izq' && prod.Izq == 1 && tipo == prod.Tipo){
                    let newProd = {
                        id: prod.id,
                        col0: prod.IdGenerate, 
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
            console.log('filtrar tipo y lado');
        }
        
    }


*/