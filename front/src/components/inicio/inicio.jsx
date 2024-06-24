
import { useContext, useState} from "react"
import { MiContexto } from "../context/context"

//lugares
import { Box, Button} from '@mui/material';
//productos
import Productos from "../productos/productos";



export default function Inicio() {


    const [ver, setVer] = useState(false)
    
    return (
        <div>
            <div>
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