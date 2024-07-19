import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';



export default function Dashboard () {

    const {lugares, productos ,cart, setCart,
        updateproductolugar
    } = useContext(MiContexto)

    
    const [total, setTotal] = useState(0)

    

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
                        id: prod.IdGenerate,
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
                <Box sx={{ width: '60%', display: 'flex', flexDirection: 'column', margin: 'auto', marginTop: '120px', padding: '15px' }} border='solid 0px' boxShadow='5px 2px 15px' >
                        <Grid margin='auto' >
                            <Typography fontSize={30} >Vista Previa</Typography>
                        </Grid>
                        <Grid container direction='column' padding={2} >
                            {
                            cart.map((el, index)=>{ 
                                return <Grid item xs={2} sm={4} md={4} key={index} 
                                            container direction="row" color='grey.300' gap={5}
                                            border='solid 0px' boxShadow='5px 0px 12px 2px' borderRadius={3} margin={1}
                                            padding={2}>
                                            
                                            <Grid item xs={4} color='black' >
                                                <Typography paddingBottom={1} alignSelf='flex-start'>
                                                    Producto:  
                                                </Typography> 
                                                <Typography >
                                                    ID: {el.id} 
                                                </Typography> 
                                                <Typography >
                                                    Lugar: {el.lugar} 
                                                </Typography> 
                                                <Typography >
                                                    Cant: {el.cantidad} 
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4} color='black'>
                                                <Typography >
                                                    SubTotal: {el.subTotal}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2} color='black' alignSelf='flex-end' >
                                                <Button startIcon={<DeleteIcon/>} >
                                                    Delete 
                                                </Button>
                                            </Grid>
                                    </Grid>
                            })
                            }
                        </Grid>
                        <Grid container item xs={2} sm={4} md={4} marginLeft={2} marginTop={2} direction='row' width='100%' >
                            <Grid item xs={10}>
                                <Typography fontSize={20} >
                                    Total: {total}
                                </Typography>
                            </Grid>
                            <Grid item xs={10} >
                                <Button startIcon={<SendIcon/>} onClick={()=>{
                                    console.log(cart);
                                    cart.map( async (el)=>{
                                        console.log(el);
                                        let update = {
                                            Idg: el.id, 
                                            stock: el.cantidad, 
                                            Lugar: el.id_lugar, 
                                            procedimiento: 'quitar'
                                        }
                                        let response = await updateproductolugar(update)
                                        console.log(response);
                                    })
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
