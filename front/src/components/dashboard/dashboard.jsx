import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";
import { Link, useNavigate } from "react-router-dom";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';





export default function Dashboard () {

    const {venta} = useContext(MiContexto)


    useEffect(()=>{
        console.log(venta);
    },[])
    


    return(
        <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column', margin: 'auto', marginTop: '120px', padding: '15px' }} border='solid 0px' boxShadow='5px 2px 15px' >
                                        <Grid margin='auto' >
                                            <Typography fontSize={30} >Dashboard</Typography>
                                        </Grid>
                                        <Grid>
                                        <Typography paddingTop={3} alignSelf='flex-start'>
                                            cliente:  
                                        </Typography>  
                                        
                                        </Grid>
                                        <Grid container direction='column' alignItems='center' >
                                            <Grid item xs={4} paddingTop={5}>
                                                    <Typography fontSize={15} marginBottom={2} >Id venta: {venta.id_venta} </Typography>
                                            </Grid>
                                            <Grid item xs={6} container direction='row' padding={2} gap={8}
                                            border='solid 0px' boxShadow='1px' borderRadius={3}>
                                                {
                                                venta.cart.map((el, index)=>{ 
                                                    return <Grid item xs={2} key={index}
                                                                container direction="column" color='grey.500'>
                                                                
                                                                    <Typography paddingTop={3} alignSelf='flex-start'>
                                                                        Producto: {el.idg} 
                                                                    </Typography>  
                                                                    <Typography >
                                                                        {el.Tipo} 
                                                                    </Typography> 
                                                                    <Typography >
                                                                        Cantidad: {el.cantidad} 
                                                                    </Typography>
                                                                    <Typography >
                                                                        {el.lugar} 
                                                                    </Typography> 
                                                                    <Typography >
                                                                        SubTotal: {el.subTotal}
                                                                    </Typography>
                                                        </Grid>
                                                })
                                                }
                                            </Grid>    
                                        </Grid>
                                        <Grid container padding={2} direction='row' width='100%' >
                                            <Grid item xs={2}>
                                                <Typography fontSize={20} >
                                                    Total: ${venta.total}
                                                </Typography>
                                                <Link to = '/' >
                                                    <Button>volver</Button>
                                                </Link>
                                            </Grid>
                                            <Box sx={{ flexGrow: 5 }} />
                                            <Grid item xs={2}  alignSelf='flex-end'>
                                                <Button startIcon={<LocalPrintshopIcon/>} onClick={ async ()=>{
                                                }} >
                                                    Imprimir 
                                                </Button>
                                            </Grid>
                                            
                                        </Grid>
                                        </Box> 
    )
}
