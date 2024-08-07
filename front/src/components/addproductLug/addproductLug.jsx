import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";
import { useNavigate } from "react-router-dom";




export default function AddProductLug () {

    const {lugares, idg, refresh,
        insertProdLug, alert
    } = useContext(MiContexto)


    const router = useNavigate()

    const [data, setData] = useState({
        Idg: idg,
        stock: '',
        Lugar: '',
    });
    //set lugares
    const [lugs, setLugs] = useState([])
    const state = () =>{
        let lu = []
        lugares.map((l)=>{
            lu.push(l)
        })
        setLugs(lu)
    }
    
    const dataFrom = async (event) => {
        event.preventDefault()
        setData( {...data, [event.target.name]: event.target.value  } )
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(data);
    }
    
    
    useEffect(()=>{
        state()
    },[])


    return(
        <Box sx={{ width: '60%', margin: 'auto', marginTop: '120px', padding: '15px' }} >
            <Typography variant="h5" gutterBottom>
                Ubicar Producto:
            </Typography>
            <Box component='form' onSubmit={handleSubmit} display={'flex'} flexDirection={'column'} >
                <Typography margin='auto' variant="h4" > {idg}  </Typography>
                <Grid container direction="column" rowSpacing={2} marginTop={2} >
                    <Grid item xs={6}>
                    <TextField 
                        required
                        fullWidth 
                        label='Ingrese cantidad de unidades' 
                        name='stock' 
                        type="number" 
                        onChange={dataFrom}/>
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        sx={{height: '10px' , marginBottom: '100px' }}
                        id="outlined-select-currency"
                        select
                        label="Donde ira este producto?"
                        name="Lugar"
                        helperText="Porfavor seleccione ubicacion"
                        onChange={dataFrom}
                        >
                        {lugs.map((option, index) => (
                            <MenuItem key={index} value={option.id}>
                            {option.fullname}
                            </MenuItem>
                        ))}
                    </TextField>
                    </Grid>
                    <Grid item xs={6} container direction='row' width='100%' >
                        <Grid item xs={6} >
                            <Button type="submit" onClick={ async ()=>{
                                console.log(data);
                                let res = await insertProdLug(data)
                                res ? (alert('success'), refresh(), router('/') ) : alert('error')
                            }} sx={{ width: '45%', height: '50px', backgroundColor: 'Black', margin: 'auto'}} >crear</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button type="submit" onClick={()=>{
                                refresh()
                                router('/')
                            }} sx={{ width: '45%', height: '50px', backgroundColor: 'Black', margin: 'auto'}} >volver</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
