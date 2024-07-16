import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";
import { useNavigate } from "react-router-dom";




export default function Dashboard () {

    const {cart} = useContext(MiContexto)

    
    const [prods, setProds] = useState([])
    const [viwer, setViwer] = useState([])

    

    useEffect(()=>{
        

    }, [])

    return(
        <div>
            {
                cart.length == 0 ? <Typography> El carrito se encuentra vacio </Typography> : 
                <Box sx={{ width: '60%', display: 'flex', flexDirection: 'column', margin: 'auto', marginTop: '120px', padding: '15px' }} >
                    <Grid>
                        <Grid>
                            <Typography>Dashboard</Typography>
                        </Grid>
                        <Grid>
                            {
                            cart.map((el, index)=>{ 
                                return <Grid key={index} color='red' >
                                            <Typography>
                                                {el.valor} 
                                            </Typography> 
                                        </Grid>
                            })
                            }
                        </Grid>
                        <Grid></Grid>
                    </Grid>
                </Box>
            
            }
        </div>
    ) 
} 
