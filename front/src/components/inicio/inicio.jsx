
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
            {
             !ubi ? <div></div> : <div style={{ display: 'flex', margin: 'auto', padding: '15px' }} >{
                infoprod.map((prod, index)=>{
                            console.log(prod);
                            return ( <Card key={index} sx={{ width: 300, margin: 'auto', marginTop: '25px', boxShadow: '2px 2px 10px 2px'  }}>
                                        <Grid container direction="row" justifyContent="center">
                                                        <CardContent sx={ { display: 'flex', flexDirection: 'column', alignItems: 'flex-end'  } } >
                                                            <p style={{ margin: '1px', fontSize: 15, fontWeight: 'bold' }}>
                                                            {prod.fullname}
                                                            </p>
                                                            <p style={{ fontSize: 14 }}>
                                                            Stock: {prod.stock}
                                                            </p>
                                                        </CardContent>
                                                        <Grid container direction="row" justifyContent='space-evenly' >
                                                            <Grid item xs={2} marginBottom={1}>
                                                                <Link to='/updateproductLug' >
                                                                    <Button size="small" sx={{width: '50px', height: '25px', padding: '20px' }} color="secondary" variant="contained"  onClick={()=>{
                                                                        setIdg(producto.IdGenerate)
                                                                        sessionStorage.setItem('id', producto.IdGenerate)
                                                                        sessionStorage.setItem('lugar', prod.fullname)
                                                                        sessionStorage.setItem('id_lugar', prod.id_lugar)
                                                                    }} ><AddCircleIcon/></Button>
                                                                </Link>
                                                            </Grid>
                                                            <Grid item xs={2} marginBottom={1}>
                                                                <Button size="small" sx={{width: '50px', height: '25px', padding: '20px' }} color="error" variant="contained" ><DeleteIcon/></Button>
                                                            </Grid>
                                                            <Grid item xs={2} marginBottom={1}>
                                                                <Button size="small" sx={{width: '50px', height: '25px', padding: '20px' }} color="success" variant="contained" onClick={async ()=>{
                                                                    let value = false
                                                                    cart.map((el)=>{  
                                                                        console.log(el.id);  
                                                                        console.log(producto.IdGenerate);
                                                                        if (el.id == producto.IdGenerate) {
                                                                            console.log('if');
                                                                            value = true
                                                                        }
                                                                    })
                                                                    console.log(value);
                                                                    !value ? Swal.fire({
                                                                        title: "Ingrese cantidad",
                                                                        input: "text",
                                                                        inputAttributes: {
                                                                        autocapitalize: "off"
                                                                        },
                                                                        showCancelButton: true,
                                                                        confirmButtonText: "aceptar",
                                                                        showLoaderOnConfirm: true,
                                                                    }).then( async (result) => {
                                                                        if (result.isConfirmed && result.value < prod.stock ) {
                                                                            alert('success')
                                                                            const carrito = []
                                                                            cart.map((el)=>{
                                                                                carrito.push(el)
                                                                            })
                                                                            const info = {
                                                                                id : producto.IdGenerate,
                                                                                lugar : prod.fullname,
                                                                                id_lugar : prod.id_lugar,
                                                                                cantidad : result.value
                                                                            }
                                                                            carrito.push(info)                    
                                                                            setCart(carrito) 
                                                                            refresh()  
                                                                            
                                                                        }else{ alert('error') }
                                                                    }) :  
                                                                    Swal.fire({
                                                                        icon: "error",
                                                                        title: "Producto ya existe en el carrito",
                                                                        text: "si quiere cambiar de lugar porfavor primero elimine el producto del carrito y vuelvalo a cargar",
                                                                    });
                                                                    
                                                                    
                                                                }} ><ShoppingCartIcon/></Button>
                                                            </Grid>
                                                        </Grid>
                                        </Grid>
                                    </Card>)
                        })
                } </div>   
            }
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