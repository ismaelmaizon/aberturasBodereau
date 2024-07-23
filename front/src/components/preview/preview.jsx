import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';



export default function Preview () {

    const {lugares, productos ,cart, setCart,
        updateproductolugar, updateStockProduct, registrarVenta, registrarProdsVenta
    } = useContext(MiContexto)

    
    const [total, setTotal] = useState(0)
    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        mail: '',
        cel: ''
    });
    const dataFrom = async (event) => {
        event.preventDefault()
        setCliente( {...cliente, [event.target.name]: event.target.value  } )
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
    }



    const deletePordCart = (id) => {
        const newCart = cart.filter(el => el.id !== id)
        let full = 0
        newCart.map((el)=>{
            full += el.subTotal
        })
        setTotal(full)
        setCart(newCart)
    }
    

    useEffect(()=>{
        console.log(cart);
        console.log(productos);
        console.log(lugares);
        let newCart = []
        let full = 0
        productos.map((prod)=>{
            cart.map((prodc)=>{
                if (prod.IdGenerate == prodc.id ) {
                    let newProd = {
                        id: prod.id,
                        idg: prod.IdGenerate,
                        Tipo: prod.Tipo,
                        lugar: prodc.lugar,
                        id_lugar: prodc.id_lugar,
                        cantidad: prodc.cantidad,
                        subTotal: prod.Precio_U * prodc.cantidad
                    }
                    full += newProd.subTotal
                    console.log(newProd);
                    newCart.push(newProd)
                }
            })  
        })
        setCart(newCart)
        setTotal(full)
    }, [])

    return(
        <div>
            {
                cart.length == 0 ? <Typography> El carrito se encuentra vacio </Typography> : 
                <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column', margin: 'auto', marginTop: '120px', padding: '15px' }} border='solid 0px' boxShadow='5px 2px 15px' >
                        <Grid margin='auto' >
                            <Typography fontSize={30} >Vista Previa</Typography>
                        </Grid>
                        <Grid container direction='row' gap={5} >
                            <Grid item xs={6} container direction='column' padding={2} >
                                {
                                cart.map((el, index)=>{ 
                                    return <Grid item xs={2} key={index}
                                                container direction="row" color='grey.300' gap={5} 
                                                border='solid 0px' boxShadow='5px 0px 12px 2px' borderRadius={3} margin={1}
                                                padding={2}>
                                                
                                                <Grid item xs={2} color='black' >
                                                    <Typography paddingBottom={3} alignSelf='flex-start'>
                                                        Producto: {el.idg} 
                                                    </Typography>  
                                                    <Typography >
                                                        {el.lugar} 
                                                    </Typography> 
                                                    <Typography >
                                                        Cant: {el.cantidad} 
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2} color='black' alignSelf='flex-end' >
                                                    <Typography >
                                                        SubTotal: {el.subTotal}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2} color='black' alignSelf='flex-end' >
                                                    <Button startIcon={<DeleteIcon/>} onClick={()=>{deletePordCart(el.id)}} >
                                                        Delete 
                                                    </Button>
                                                </Grid>
                                        </Grid>
                                })
                                }
                            </Grid>
                            <Grid item xs={4} container direction="row" alignContent='flex-start'>
                                    <Typography fontSize={15} marginBottom={2} >Datos Cliente</Typography>
                                    <Grid container direction="column" spacing={2} onSubmit={handleSubmit} >
                                        <Grid item xs={2}>
                                        <TextField fullWidth label='nombre' name='nombre' type="text" onChange={dataFrom}></TextField>
                                        </Grid>
                                        <Grid item xs={2}>
                                        <TextField fullWidth label='apellido' name='apellido' type="text" onChange={dataFrom}></TextField>
                                        </Grid>
                                        <Grid item xs={2}>
                                        <TextField fullWidth label='mail' name='mail' type="email" onChange={dataFrom}></TextField>
                                        </Grid>
                                        <Grid item xs={2}>
                                        <TextField fullWidth label='cel' name='cel' type="number" onChange={dataFrom}></TextField>
                                        </Grid>
                                    </Grid>
                            </Grid>
                        </Grid>
                        <Grid container padding={2} direction='row' width='100%' >
                            <Grid item xs={2}>
                                <Typography fontSize={20} >
                                    Total: ${total}
                                </Typography>
                                <Link to = '/' >
                                    <Button>volver</Button>
                                </Link>
                            </Grid>
                            <Box sx={{ flexGrow: 5 }} />
                            <Grid item xs={2}  alignSelf='flex-end'>
                                <Button startIcon={<SendIcon/>} onClick={ async ()=>{
                                    let status = false
                                    const info = {
                                        'cliente': cliente,
                                        'total': total
                                    }
                                    const respons = await registrarVenta(info)
                                    console.log(respons);
                                    cart.map( async (el)=>{
                                        let infoProd = {
                                            id_venta: respons.id,
                                            id_producto: el.id, 
                                            IdGenerate: el.idg, 
                                            Tipo: el.Tipo, 
                                            cantidad: el.cantidad, 
                                            subtotal: el.subTotal
                                        }
                                        
                                        let regProdVenta = await registrarProdsVenta(infoProd)
                                        console.log(regProdVenta.status);
                                        if (regProdVenta.status == 200) {
                                            let update = {
                                                Idg: el.idg, 
                                                stock: el.cantidad, 
                                                Lugar: el.id_lugar, 
                                                procedimiento: 'quitar'
                                            }
                                            let upprodlug = await updateproductolugar(update)
                                            console.log(upprodlug);
                                            if (upprodlug.status == 200) {
                                                let upprod = await updateStockProduct(update.Idg)
                                                console.log(upprod);
                                            }
                                        }else{
                                            status = false
                                        } 
                                    })
                                    /*
                                    if (status) {
                                        cart.map( async (el)=>{
                                            console.log(el);
                                            let update = {
                                                Idg: el.idg, 
                                                stock: el.cantidad, 
                                                Lugar: el.id_lugar, 
                                                procedimiento: 'quitar'
                                            }
                                            let upprodlug = await updateproductolugar(update)
                                            console.log(upprodlug);
                                            if (upprodlug.status == 200) {
                                                let upprod = await updateStockProduct(update.Idg)
                                                console.log(upprod);
                                            }})   
                                        
                                    }*/
                                    
                                }} >
                                    Vender 
                                </Button>
                            </Grid>
                        </Grid>
                </Box>
            
            }
        </div>
    ) 
} 
