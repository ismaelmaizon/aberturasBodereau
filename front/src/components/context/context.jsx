// contexto

import { useEffect, useState } from "react";
import { createContext } from "react";


export const MiContexto = createContext([])


const CartProvider = ({children}) => {
  //obtener lugares
  const [lugares, setLugares] = useState([])
  
  const getLugares = async () =>{
      try {
          const response = await fetch('http://localhost:8080/api/lugares/lugares')
          if (!response.ok) {
            throw new Error('problemas al consultar en la navegacion');
          }
          const data = await response.json();
          setLugares(data.response)
        } catch (error) {
          console.error('problemas con la consulta:', error);
        }
      
  }

  //obtener productos
  const [productos, setProductos] = useState([])
  
  const getProductos = async () =>{
      try {
          const response = await fetch('http://localhost:8080/api/productos')
          if (!response.ok) {
            throw new Error('problemas al consultar en la navegacion');
          }
          const data = await response.json();
          setProductos(data.response)
        } catch (error) {
          console.error('problemas con la consulta:', error);
        }
      
  }

  //obtener ubicacion de productos
  const [producto, setProducto] = useState([])
  const [infoprod, setInfoprod] = useState([])

  const getUbiProducto = async (id) =>{
      try {
          const response = await fetch(`http://localhost:8080/api/lugaresProd/getUbicacionProducto/${id}`)
          if (!response.ok) {
            throw new Error('problemas al consultar en la navegacion');
          }
          const data = await response.json();
          setProducto(data.response)
        } catch (error) {
          console.error('problemas con la consulta:', error);
        }
      
  }
  

  useEffect(()=>{
    getProductos(),
    getLugares()
  },[])

  return (
      // aca llamamos al hoock useMiContexto
      <MiContexto.Provider value={{
        lugares, setLugares,
        productos, setProductos, getProductos,
        producto, setProducto, getUbiProducto, infoprod, setInfoprod,

      }} >
          {children}
      </MiContexto.Provider>
  )
}

// Este va a ser el encargado de proveer el contexto a elementos hijos
export default CartProvider