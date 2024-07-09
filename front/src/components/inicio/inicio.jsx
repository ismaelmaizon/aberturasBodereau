
import { useContext, useEffect, useState} from "react"
import { MiContexto } from "../context/context"

//lugares
import { Box, Button, CardActions, CardContent, Grid} from '@mui/material';
//productos
import Productos from "../productos/productos";



export default function Inicio() {
    const {
        producto, lugares, infoprod, setInfoprod
    } = useContext(MiContexto)

    const [ver, setVer] = useState(false)


    
    useEffect(()=>{
        let info = []
        lugares.map((lug)=>{
            producto.map((pr)=>{
                if (lug.id == pr.id_lugar) {
                    let resul = { fullname : lug.fullname, stock: pr.stock }
                    info.push(resul)
                }
            })
        })
        setInfoprod(info)

    }, [producto])

    return (
        <div>
            <div>
            {
             producto.length == 0 ? <div></div> : <div style={{ display: 'flex', margin: 'auto', padding: '15px' }} >{
                infoprod.map((prod, index)=>{
                            console.log(prod);
                            return ( <Box key={index} sx={{ margin: 'auto', backgroundColor:'#ec407a' , borderRadius: '10px' }}  >
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
                                                            <Button size="medium" sx={{ margin: 'auto', backgroundColor: '#1769aa', color: 'white' }} >Actualizar Stock</Button>
                                                            <Button size="medium" sx={{ margin: 'auto', backgroundColor: '#1769aa', color: 'white' }} >Eliminar del Lugar</Button>
                                                        </CardActions>
                                                    </Grid>
                                        </Grid>
                                    </Box>)
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