
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
import Producto from "../producto/producto";
import Ubiproducto from "../ubiproducto/ubiproducto";

export default function Inicio() {
    const {
        vprod, setVprod, vent, setVent,
        getProductos, getVentas, getLugares,
        producto,
        getUbiProducto, productoUbi, lugares, infoprod, setInfoprod, ubi, setUbi,
        setIdg, alert,
        cart, setCart,
        refresh
    } = useContext(MiContexto)

    const router = useNavigate()    

    useEffect(()=>{
        let info = []
        lugares.map((lug)=>{
            productoUbi.map((pr)=>{
                if (lug.id == pr.id_lugar) {
                    let resul = { fullname : lug.fullname, stock: pr.stock, id_lugar: lug.id }
                    info.push(resul)
                }
            })
        })
        setInfoprod(info)

    }, [productoUbi])



    return (
        <div>
            <div>
                <Producto/>
            </div>
            <div>
                <Ubiproducto/>
            </div>
            {
               vprod || vent ? ( (vprod ? <div style={{ width: '100%',  }}><Productos/></div> : <div style={{ width: '100%',  }}><Ventas/></div>) ) 
               : <div style={{ display: 'flex', marginTop: '45px' }} >
                   <Button variant="contained" size="large" style={{ margin: 'auto', backgroundColor: '#ab47bc' }} onClick={ async ()=>{ 
                       await getProductos() 
                       await getLugares()
                       setVprod(true)}} >Productos</Button>
                   <Button variant="contained" size="large" style={{ margin: 'auto', backgroundColor: '#ab47bc' }} onClick={ async ()=>{ 
                       await getVentas() 
                       await getLugares() 
                       setVent(true)}} >Ventas</Button>
               </div>
            }
            </div>
    ) 
}


/*
 prod || vent ? ( (prod ? <div style={{ width: '100%',  }}><Productos/></div> : <div style={{ width: '100%',  }}><Ventas/></div>) ) 
: <div style={{ display: 'flex', marginTop: '45px' }} >
    <Button variant="contained" size="large" style={{ margin: 'auto', backgroundColor: '#ab47bc' }} onClick={ async ()=>{ 
        await getProductos() 
        setProd(true)}} >Productos</Button>
    <Button variant="contained" size="large" style={{ margin: 'auto', backgroundColor: '#ab47bc' }} onClick={ async ()=>{ 
        await getVentas() 
        setVent(true)}} >Ventas</Button>
</div>

*/ 