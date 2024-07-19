import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';



export default function Dashboard () {

    const {lugares, productos ,cart} = useContext(MiContexto)

    
    const [prods, setProds] = useState([])
    const [viwer, setViwer] = useState([])

    

    useEffect(()=>{
        console.log(cart);
        console.log(productos);
        console.log(lugares);
    }, [])

    return(
        <div>
            {
                cart.length == 0 ? <Typography> El carrito se encuentra vacio </Typography> : 
                <Box sx={{ width: '60%', display: 'flex', flexDirection: 'column', margin: 'auto', marginTop: '120px', padding: '15px' }} border='solid' >
                    <Grid>
                        <Grid container  >
                            <Typography  >Dashboard</Typography>
                        </Grid>
                        <Grid container direction='column' border='solid' padding={2} >
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
                                                    SubTotal: 
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
                        <Grid marginTop={2} >
                            Total: 
                        </Grid>
                    </Grid>
                </Box>
            
            }
        </div>
    ) 
} 
