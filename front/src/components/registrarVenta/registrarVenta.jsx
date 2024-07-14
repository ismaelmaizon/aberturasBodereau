import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";
import { useNavigate } from "react-router-dom";




export default function RegistrarVenta () {

    const {alert, producto, productoUbi, lugares, registrarVenta, updateproductolugar} = useContext(MiContexto)

    const router = useNavigate()

    const [data, setData] = useState({
        id_producto: producto.id,
        Idg: producto.IdGenerate,
        Tipo: producto.Tipo,
        stock: 0,
        nombre: '',
        apellido: '',
        mail: '',
        cel: 0,
        Lugar: '',
        procedimiento: 'quitar'
    });

    const [lug, setLug] = useState([])
    const namesLug = () =>{
        let info = []
        lugares.map((lug)=>{
            productoUbi.map((pr)=>{
                if (lug.id == pr.id_lugar) {
                    let resul = { fullname : lug.fullname }
                    info.push(resul)
                }
            })
        })
        setLug(info)
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
        console.log(producto);
        console.log(data);
        console.log(productoUbi);
        console.log(lugares);
        namesLug()
    }, [])

    return(
        <Box sx={{ width: '60%', display: 'flex', flexDirection: 'column', margin: 'auto', marginTop: '120px', padding: '15px' }} >
            <Grid container direction='column' alignItems='center' marginBottom={5} >
                <Typography variant="h4">
                    Registrar Venta
                </Typography>
            </Grid>
            <Grid container direction='row' spacing={10} >
                <Grid item xs={6} >
                    <Typography variant="h6" gutterBottom>
                        Producto: {producto.IdGenerate}
                    </Typography>
                </Grid>
                <Grid item xs={6} >
                    <Typography variant="h6" gutterBottom>
                        Tipo: {producto.Tipo}
                    </Typography>
                </Grid>
            </Grid>
            <Box component='form' onSubmit={handleSubmit} display={'flex'} flexDirection={'column'} >
                <Grid container direction="row" rowSpacing={1} spacing={5}>
                        <Grid item xs={6}>
                        <TextField fullWidth label='nombre' name='nombre' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField fullWidth label='apellido' name='apellido' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField fullWidth label='cantidad' name='cantidad' type="number" onChange={dataFrom}></TextField>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField fullWidth label='mail' name='mail' type="email" onChange={dataFrom}></TextField>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField fullWidth label='cel' name='cel' type="number" onChange={dataFrom}></TextField>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            fullWidth
                            sx={{height: '0px'}}
                            id="outlined-select-currency"
                            select
                            label="Seleccione lugar que va a sacar el producto"
                            name="Lugar"
                            helperText="Seleccione lugar que va a sacar el producto"
                            onChange={dataFrom}
                            >
                            {lug.map((option, index) => (
                                <MenuItem key={index} value={option.fullname}>
                                {option.fullname}
                                </MenuItem>
                            ))}
                        </TextField>
                        </Grid>
                </Grid>
                <Grid container direction='row' alignItems='center' marginTop={5} >
                    <Grid item xs={6}>
                        <Button type="submit" onClick={ async ()=>{
                            console.log(data);
                            let respon = await registrarVenta(data)
                            let respon2 = await updateproductolugar(data)
                            console.log(respon.status);
                            /*
                            if (respon.status == 200) {
                                await alert('success')
                                router('/')
                            }*/
                        }} sx={{ width: '45%', height: '50px', backgroundColor: 'Black', margin: 'auto'}} >vender
                        </Button>                        
                    </Grid>
                    <Grid item xs={6}>
                        <Button type="submit" onClick={ async ()=>{
                            console.log(data);
                            //let respon = await createProducto(data)
                            /*
                            console.log(respon.status);
                            if (respon.status == 200) {
                                await alert('success')
                                router('/')
                            }*/
                        }} sx={{ width: '45%', height: '50px', backgroundColor: 'Black', margin: 'auto'}} >cancelar
                        </Button>                        
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
