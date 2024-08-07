// contexto

import { useEffect, useState } from "react";
import { createContext } from "react";
//alert
import Swal from 'sweetalert2'

export const MiContexto = createContext([])


const CartProvider = ( { children } ) => {
  //vista
  const [vprod, setVprod] = useState(false)
  const [vent, setVent] = useState(false)


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
  //obtener producto
  const [idg, setIdg] = useState('')
  const [producto, setProducto] = useState([])
  const getProducto = async (id) =>{
      try {
          const response = await fetch(`http://localhost:8080/api/producto/${id}`)
          if (!response.ok) {
            throw new Error('problemas al consultar en la navegacion');
          }
          const data = await response.json();
          setIdg(data.IdGenerate)
          return data
        } catch (error) {
          console.error('problemas con la consulta:', error);
        }
      
  }
  //obtener ubicacion de productos
  const [productoUbi, setProductoUbi] = useState([])
  const [infoprod, setInfoprod] = useState([])
  const getUbiProducto = async (id) =>{
    try {
        const response = await fetch(`http://localhost:8080/api/lugaresProd/getUbicacionProducto/${id}`)
        if (!response.ok) {
          throw new Error('problemas al consultar en la navegacion');
        }
        const data = await response.json();
        if (data.response == []) {
          return []
        }else{
          setProductoUbi(data.response)
          return data.response
        }
      } catch (error) {
        console.error('problemas con la consulta:', error);
      }
  }
  //obtener productos de un lugar
  const [productsLug, setProductsLug] = useState([])
  const getProductosLugar = async (id) =>{
    try {
      const response = await fetch(`http://localhost:8080/api/lugaresProd/getProductosLugar/${id}`)
          if (!response.ok) {
            throw new Error('problemas al consultar en la navegacion');
          }
          const data = await response.json();
          return data.response
        } catch (error) {
          console.error('problemas con la consulta:', error);
        }
        
  }
  
  //crear producto
  //const [prodCreado, setPructoCreado] = useState(false)
  const createProducto = async ( data ) =>{
    let prod = {
      Tipo: data.Tipo,
      Descripcion: data.Descripcion,
      Alto: data.Alto,
      Ancho: data.Ancho,
      Derc: '',
      Izq: '',
      Precio_U: data.Precio_U}
    if (data.Lado == 'Derc'){
      prod.Derc = 1
      prod.Izq = 0
    }else{
      prod.Derc = 0
      prod.Izq = 1
    }  
    console.log(data);
    console.log(prod);
    
      try {
        const response = await fetch('http://localhost:8080/api/producto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(prod)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        return response
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        
    }
  }

  //añadir producto a un lugar
  const insertProdLug = async (data) => {
    const {Idg, stock, Lugar} =  data
    let info = {
      "id_lugar": Lugar,
      "stock": stock
    }
    try {
      const response = await fetch(`http://localhost:8080/api/lugaresProd/addProductoLugar/${Idg}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      
  }
  }

  //actulizar producto en un lugar
  const updateproductolugar = async (data) => {
    const {Idg, stock, Lugar, procedimiento} =  data
    let info = {
      "id_lugar": Lugar,
      "stock": stock,
      "procedimiento": procedimiento,
    }
    try {
      const response = await fetch(`http://localhost:8080/api/lugaresProd/updateProductoLugar/${Idg}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response.status);
      return response
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
  }

  //actualizar stock del producto
  const updateStockProduct = async (id) =>{
    try {
      const response = await fetch(`http://localhost:8080/api/lugaresProd/upDateStockProducto/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response);
      return response
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      
  }
  }

  // Filtro productos
  // rows (filas de la tabla) 
  const [rows, setRows] = useState([])
  const filtrarTipoLadoLug = async (tipo, lado, lug) => {
    setRows([]);
    let prods = [];
    
    const addProduct = (prod) => {
        prods.push({
            id: prod.id,
            col0: prod.IdGenerate,
            col1: prod.Tipo,
            col2: prod.Descripcion,
            col3: prod.Alto,
            col4: prod.Ancho,
            col5: prod.Derc,
            col6: prod.Izq,
            col7: prod.stock,
            col8: prod.Precio_U
        });
    };

    const filterByLugar = async (lug) => {
        const response = await getProductosLugar(lug);
        setProductsLug(response);
        productsLug.forEach(prodlug => {
            productos.forEach(prod => {
                if (prodlug.id_producto === prod.id) addProduct(prod);
            });
        });
    };

    const filterByTipo = () => {
        productos.forEach(prod => {
            if (tipo === prod.Tipo) addProduct(prod);
        });
    };

    const filterByLado = () => {
        productos.forEach(prod => {
            if ((lado === 'Derc' && prod.Derc === 1) || (lado === 'Izq' && prod.Izq === 1)) addProduct(prod);
        });
    };

    const filterByTipoYLado = () => {
        productos.forEach(prod => {
            if ((lado === 'Derc' && prod.Derc === 1 && tipo === prod.Tipo) || (lado === 'Izq' && prod.Izq === 1 && tipo === prod.Tipo)) addProduct(prod);
        });
    };

    const filterByLugarYTipo = async (lug) => {
        const response = await getProductosLugar(lug);
        setProductsLug(response);
        productsLug.forEach(prodlug => {
            productos.forEach(prod => {
                if (prodlug.id_producto === prod.id && tipo === prod.Tipo) addProduct(prod);
            });
        });
    };

    const filterByLugarYLado = async (lug) => {
        const response = await getProductosLugar(lug);
        setProductsLug(response);
        productsLug.forEach(prodlug => {
            productos.forEach(prod => {
                if (prodlug.id_producto === prod.id && ((lado === 'Derc' && prod.Derc === 1) || (lado === 'Izq' && prod.Izq === 1))) addProduct(prod);
            });
        });
    };


    if (lug && !tipo && !lado) {
        await filterByLugar(lug);
    } else if (tipo && !lado && !lug) {
        filterByTipo();
    } else if (lado && !tipo && !lug) {
        filterByLado();
    } else if (lug && tipo && !lado) {
        await filterByLugarYTipo(lug);
    } else if (lug && lado && !tipo) {
        await filterByLugarYLado(lug);
    } else if (tipo && lado && !lug) {
        filterByTipoYLado();
    } else if (tipo && lado && lug) {
        const response = await getProductosLugar(lug);
        setProductsLug(response);
        productsLug.forEach(prodlug => {
            productos.forEach(prod => {
                if (prodlug.id_producto === prod.id && ((lado === 'Derc' && prod.Derc === 1) || (lado === 'Izq' && prod.Izq === 1)) && tipo == prod.Tipo ) addProduct(prod);
            });
        });
    }

    setRows(prods);
  };
  
  const [cart, setCart] = useState([])
  //Registrar Venta
  const [venta, setVenta] = useState({})
  const registrarVenta = async (data) => {
    const venta = {
      'cliente': data.cliente,
      'total': data.total
    }
    console.log(venta);
    try {
      const response = await fetch(`http://localhost:8080/api/ventas/registrarVenta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(venta)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json()
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      
    }
  }
  //obtener ventas
  const [ventas, setVentas] = useState([])
  const getVentas = async () =>{
    try {
        const response = await fetch('http://localhost:8080/api/ventas/getVentas')
        if (!response.ok) {
          throw new Error('problemas al consultar en la navegacion');
        }
        const data = await response.json();
        setVentas(data.response)
      } catch (error) {
        console.error('problemas con la consulta:', error);
      }
  }
  //obtener venta
  const [idv, setIdv] = useState('')
  const [ventainf, setVentainf] = useState([])
  const getVenta = async (id) =>{
      try {
          const response = await fetch(`http://localhost:8080/api/ventas/getVentaId/${id}`)
          if (!response.ok) {
            throw new Error('problemas al consultar en la navegacion');
          }
          const data = await response.json();
          setIdv(data.id_venta)
          return data
        } catch (error) {
          console.error('problemas con la consulta:', error);
        }
      
  }

  //añadir producto a Venta
  const registrarProdsVenta = async (data) =>{
    console.log(data);
    try {
      const response = await fetch(`http://localhost:8080/api/ventas/registrarProdVenta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response.status);
      return response
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      
    }
  }

  // Limpiar Filtro
  const [lug, setLug] = useState('')
  const [lado, setLado] = useState('')
  const [tipo, setTipo] = useState('')
  const [ubi, setUbi] = useState(false)

  const refresh = () =>{
    setUbi(false)
    setIdg('')
    setProducto([])
    setInfoprod([])
    setTipo('')
    setLado('')
    setLug('')
    let prods = []
    productos.map((prod)=>{ 
        console.log(prod.id);
        let newProd = {
            id: prod.id,
            col0: prod.IdGenerate, 
            col1: prod.Tipo, 
            col2: prod.Descripcion,
            col3: prod.Alto,
            col4: prod.Ancho,
            col5: prod.Derc,
            col6: prod.Izq,
            col7: prod.stock,
            col8: prod.Precio_U
        }
        prods.push(newProd)
    })
    setRows(prods)
}

  //Alertas
  const alert = async (status) =>{
    if (status == 'success') {
      const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Proceso exitoso"
        });
    }else if (status == 'error') {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Problemas con el proceso"
      });
    }else if (status == 'warning') {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "warning",
        title: "producto no se encuentra en ningun lugar"
      });
    }else if (status == 'succesStock') {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Stock Actualizado"
      });
    }
}
      

  useEffect(()=>{
    console.log('context');
  },[])

  return (
      // aca llamamos al hoock useMiContexto
      <MiContexto.Provider value={{
        vprod, setVprod, vent, setVent,
        
        productos, setProductos, getProductos,
        producto, setProducto, getProducto, idg, setIdg,
        productoUbi, setProductoUbi, getUbiProducto, infoprod, setInfoprod,
        updateStockProduct,
        getProductosLugar, productsLug, setProductsLug,
        filtrarTipoLadoLug, rows, setRows,
        
        getLugares, lugares, setLugares,
        lug, setLug, lado, setLado, tipo, setTipo, ubi, setUbi,
        createProducto,
        insertProdLug, updateproductolugar,
        registrarVenta, registrarProdsVenta, venta, setVenta, 
        cart, setCart, 
        idv, setIdv,
        getVentas, ventas, setVentas,
        ventainf, setVentainf, getVenta,
        refresh,
        alert
      }} >
          {children}
      </MiContexto.Provider>
  )
}

// Este va a ser el encargado de proveer el contexto a elementos hijos
export default CartProvider