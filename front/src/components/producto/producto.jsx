
import { useContext, useEffect, useState} from "react"
import { MiContexto } from "../context/context"

//lugares
import {Button, Card, CardActions, CardContent, Grid, Typography} from '@mui/material';
//productos
import Productos from "../productos/productos";
import { Link, useNavigate } from "react-router-dom";
//alert
import Swal from 'sweetalert2'
//icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Ventas from "../ventas/ventas";

export default function Producto() {
    const {
        producto,
        getUbiProducto, setUbi,
        setIdg, alert,
    } = useContext(MiContexto)

    return (
        <div>
            {producto.length == 0 ? <div></div> : <Card sx={{ maxWidth: 500, margin: 'auto', marginTop: '25px', boxShadow: '2px 2px 10px 2px'  }}>
                    <Grid container direction='row' alignItems='center'>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                            Informacion del Producto 
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Id Producto: {producto.IdGenerate}
                            </Typography>
                            <Typography  variant="body2" color="text.secondary">
                            Descripcion: {producto.Descripcion}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Precio: {producto.Precio_U}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Stock: {producto.stock}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <CardActions  >
                        <Link to='/addproductLug' >
                            <Button size="small" color="info" variant="contained" onClick={ async ()=>{
                                setIdg(producto.IdGenerate)
                            }} >agaregara a lugar</Button>
                        </Link>
                            <Button size="small" color="info" variant="contained" onClick={ async ()=>{
                                const response = await getUbiProducto(producto.IdGenerate)
                                if (response.length == 0) {
                                    setUbi(false)
                                    alert('warning')
                                }else{
                                    setUbi(true)
                                }
                            }} >ver Ubicaciones</Button>
                            <Button size="small" color="info" variant="contained" onClick={()=>{
                                router('/detalle')
                            }} >detalle</Button>
                        
                    </CardActions>
                </Card>
             } 
    </div>)}