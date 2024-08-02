
import { useContext, useEffect} from "react"
import { MiContexto } from "../context/context"

//lugares
import {Button, Card, CardActions, CardContent, Grid, Typography} from '@mui/material';
//productos
import { Link, useNavigate } from "react-router-dom";


export default function PorductDetail() {
    const {
        producto,
        getUbiProducto, setUbi,
        setIdg, alert
    } = useContext(MiContexto)    

    const router = useNavigate()


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
                    <Link to='/' >
                        <Button size="small" color="info" variant="contained" >volver</Button>
                    </Link>   
                </CardActions>
                </Card>
             }
        </div>
    )} 