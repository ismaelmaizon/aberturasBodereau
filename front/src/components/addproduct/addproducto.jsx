import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { MiContexto } from "../context/context";




export default function AddProducto () {

    const {createProducto} = useContext(MiContexto)

    const [data, setData] = useState({
        Tipo: '',
        Descripcion: '',
        Alto: '',
        Ancho: '',
        Lado: '',
        stock: 0,
        Precio_U: 0,

    });

    const lado = [
        {
          name: 'Derc'
        },
        {
          name: 'Izq'
        }
    ];

    const dataFrom = async (event) => {
        event.preventDefault()
        setData( {...data, [event.target.name]: event.target.value  } )
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(data);
    }


    return(
        <Box sx={{ width: '60%', margin: 'auto', marginTop: '120px', padding: '15px' }} >
            <Typography variant="h4" gutterBottom>
                Agregar nuevo producto
            </Typography>
            <Box component='form' onSubmit={handleSubmit} display={'flex'} flexDirection={'column'} >
                <Grid container direction="row" >
                    <Grid container direction="column" rowSpacing={1} spacing={5}>
                        <Grid item xs={6}>
                        <TextField fullWidth label='Tipo' name='Tipo' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField fullWidth label='Descripcion' name='Descripcion' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField fullWidth label='Alto' name='Alto' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField fullWidth label='Ancho' name='Ancho' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                    </Grid>
                    <Grid container direction="column" columnSpacing={1} spacing={0}>
                        <Grid item xs={10} >
                        <TextField fullWidth label='Stock' name='stock' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                        <Grid item xs={10}>
                        <TextField fullWidth label='Precio_U' name='Precio_U' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                        <Grid item xs={10}>
                        <TextField
                            fullWidth
                            sx={{height: '0px'}}
                            id="outlined-select-currency"
                            select
                            label="Lado"
                            name="Lado"
                            helperText="Please select your lado"
                            onChange={dataFrom}
                            >
                            {lado.map((option, index) => (
                                <MenuItem key={index} value={option.name}>
                                {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        </Grid>
                    </Grid>
                </Grid>
            <Button type="submit" onClick={ async ()=>{
                console.log(data);
                createProducto(data)
            }} sx={{ width: '45%', height: '50px', backgroundColor: 'Black', margin: 'auto'}} >crear</Button>
            </Box>
        </Box>
    )
}

/*
<Grid item xs={6}>
<TextField fullWidth label='Descripcion' name='descripcion' type="text" onChange={dataFrom}></TextField>
</Grid>
<Grid item xs={6}>
<TextField fullWidth label='Alto' name='alto' type="text" onChange={dataFrom}></TextField>
</Grid>
<Grid item xs={6}>
<TextField fullWidth label='Ancho' name='ancho' type="text" onChange={dataFrom}></TextField>
</Grid>
<Grid item xs={6}>
<TextField fullWidth label='Derc' name='Derc' type="text" onChange={dataFrom}></TextField>
</Grid>
<Grid item xs={6}>
<TextField fullWidth label='Izq' name='Izq' type="text" onChange={dataFrom}></TextField>
</Grid>
<Grid item xs={6}>
<TextField fullWidth label='Stock' name='stock' type="text" onChange={dataFrom}></TextField>
</Grid>
<Grid item xs={6}>
<TextField fullWidth label='PrecioUnidad' name='PrecioUnidad' type="text" onChange={dataFrom}></TextField>
</Grid>

*/