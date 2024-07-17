import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";
import { useNavigate } from "react-router-dom";




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
                <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column', margin: 'auto', marginTop: '120px', padding: '15px' }} >
                    <Grid>
                        <Grid marginBottom={5} >
                            <Typography>Dashboard</Typography>
                            
                        </Grid>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                            {
                            cart.map((el, index)=>{ 
                                return <Grid item xs={2} sm={4} md={4} key={index} container direction="row" color='blue' padding={3} >
                                        <Button  variant="contained" >
                                            <Grid key={index} container direction="column" padding={2}  >
                                            <Typography paddingBottom={1} alignSelf='flex-start'>
                                                {el.id} 
                                            </Typography> 
                                            <Typography >
                                                Lugar: {el.lugar} 
                                            </Typography> 
                                            <Typography >
                                                Cant: {el.cantidad} 
                                            </Typography>
                                            </Grid>
                                        </Button> 
                                    </Grid>
                            })
                            }
                        </Grid>
                        <Grid>
                            Total: 
                        </Grid>
                    </Grid>
                </Box>
            
            }
        </div>
    ) 
} 
