
import { useContext, useEffect, useState} from "react"
import { MiContexto } from "../context/context"

//lugares
import {Button, Card, CardActions, CardContent, Grid, Typography} from '@mui/material';
//productos
import Productos from "../productos/productos";
import { Link } from "react-router-dom";
//alert
import Swal from 'sweetalert2'

export default function Inicio() {
    const {
        getProductos,
        producto,
        getUbiProducto, productoUbi, lugares, infoprod, setInfoprod, ubi, setUbi,
        setIdg, alert,
        updateStockProduct,
        cart, setCart,
        refresh
    } = useContext(MiContexto)

    

    const [ver, setVer] = useState(false)
    
    useEffect(()=>{
        let info = []
        lugares.map((lug)=>{
            productoUbi.map((pr)=>{
                if (lug.id == pr.id_lugar) {
                    let resul = { fullname : lug.fullname, stock: pr.stock }
                    info.push(resul)
                }
            })
        })
        setInfoprod(info)

    }, [productoUbi])



    return (
        <div>
            <div>
            {producto.length == 0 ? <div></div> : <Card sx={{ maxWidth: 500, margin: 'auto', marginTop: '25px'  }}>
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
                <CardActions>
                    <Link to='/addproductLug' >
                        <Button size="small" color="info" variant="contained" onClick={ async ()=>{
                            setIdg(producto.IdGenerate)
                        }} >agaregara a lugar</Button>
                    </Link>
                        <Button size="small" color="info" variant="contained"onClick={ async ()=>{
                            const response = await updateStockProduct(producto.IdGenerate)
                            if (response) {
                                alert('succesStock')
                                refresh()
                                getProductos()
                                setVer(false)
                            }
                        }} >actualizar su stock</Button>
                        <Button size="small" color="info" variant="contained" onClick={ async ()=>{
                            const response = await getUbiProducto(producto.IdGenerate)
                            if (response.length == 0) {
                                setUbi(false)
                                alert('warning')
                            }else{
                                setUbi(true)
                            }
                        }} >ver Ubicaciones</Button>
                    
                </CardActions>
                </Card>
             }
            {
             !ubi ? <div></div> : <div style={{ display: 'flex', margin: 'auto', padding: '15px' }} >{
                infoprod.map((prod, index)=>{
                            console.log(prod);
                            return ( <Card key={index} sx={{ maxWidth: 500, margin: 'auto', marginTop: '25px'  }}  >
                                        <Grid container direction="row" justifyContent="center" alignItems="center" >
                                                    <Grid item xs={15}>
                                                        <CardContent>
                                                            <p style={{ fontSize: 14 }}>
                                                            Lugar: {prod.fullname}
                                                            </p>
                                                            <p style={{ fontSize: 14 }}>
                                                            stock: {prod.stock}
                                                            </p>
                                                        </CardContent>
                                                        <CardActions>
                                                            <Link to='/updateproductLug' >
                                                                <Button size="medium" sx={{ margin: 'auto', backgroundColor: '#1769aa', color: 'white' }} onClick={()=>{
                                                                    setIdg(producto.IdGenerate)
                                                                }} >Actualizar Stock</Button>
                                                            </Link>
                                                            <Button size="medium" sx={{ margin: 'auto', backgroundColor: '#1769aa', color: 'white' }} >Eliminar del Lugar</Button>
                                                            <Button size="md" color="error" variant="contained" onClick={async ()=>{
                                                                Swal.fire({
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
                                                                            cantidad : result.value
                                                                        }
                                                                        carrito.push(info)                    
                                                                        setCart(carrito) 
                                                                        refresh()  
                                                                        
                                                                    }else{ alert('error') }
                                                                  });
                                                                
                                                            }} >
                                                                agregar al carrito
                                                            </Button>
                                                        </CardActions>
                                                    </Grid>
                                        </Grid>
                                    </Card>)
                        })
                } </div>   
            }
            {
                ver ? <div style={{ width: '100%',  }}><Productos/></div> 
                : <div style={{ display: 'flex', marginTop: '45px' }} >
                    <Button variant="contained" size="large" style={{ margin: 'auto', backgroundColor: '#ab47bc' }} onClick={()=>{ setVer(true)}} >Productos</Button>
                </div>
            }
            </div>
        </div> 
    ) 
}