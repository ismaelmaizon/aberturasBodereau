import { pool } from "../db.js";

//agregar un producto a un lugar
export const addproductolugar = async (req, res) =>{
    const {ti} = req.params 
    const {id_lugar, stock} = req.body
    let { id, newStock } = 0
    try{
        //busqueda de prodcuto
        const [rowProducto] = await pool.query("SELECT * FROM productos WHERE Tipo = ?",
            [ti]
        );
        let id_producto = rowProducto[0].id
        //actualiazcion de stock
        //validacion de existencia previa
        const [exists] = await pool.query("SELECT * FROM lugaresProducto WHERE id_producto = ?",
            [id_producto]
        );
        console.log(exists);
        console.log('cantidad de lugares donde se encuentra: ', exists.length);
        let value = false
        for (let i = 0; i < exists.length; i++){
            let prod = exists[i]
            if (prod.id_lugar == id_lugar) {
                value = false
                newStock = prod.stock + stock;
                id = prod.id
                break  //fin de la iteracion
            } else {
                value = true;
                // Continua la iteración
            }
        };
        console.log(value);
        if (value){
            //agregar producto a un lugar
            const [row] = await pool.query("INSERT INTO lugaresProducto (id_lugar, id_producto, stock) VALUES(?, ?, ?)",
                [id_lugar, id_producto, stock ])
            res.send( {status: 200, message: 'succes', response: row} );
        }else{
            //actualizar stock en lugar
            const [updateStock] = await pool.query("UPDATE lugaresProducto SET stock = ? WHERE id = ?", [newStock, id])
            res.send( {status: 200, message: 'succes', response: updateStock} );
        }
    }catch(error) {
        return res.status(500).json({ message: "Something goes wrong" });
  }
} 

//sacar producto de un lugar
export const deleteproductolugar = async (req, res) =>{
    const {ti} = req.params 
    const {id_lugar, stock} = req.body
    let { id, newStock } = 0
    try{
        //busqueda de prodcuto
        const [rowProducto] = await pool.query("SELECT * FROM productos WHERE Tipo = ?",
            [ti]
        );
        let id_producto = rowProducto[0].id
        //actualiazcion de stock
        //validacion de existencia previa
        const [exists] = await pool.query("SELECT * FROM lugaresProducto WHERE id_producto = ?",
            [id_producto]
        );
        console.log(exists);
        console.log('cantidad de lugares donde se encuentra: ', exists.length);
        for (let i = 0; i < exists.length; i++){
            let prod = exists[i]
            console.log(prod);
            if (prod.id_lugar == id_lugar) {
                newStock = prod.stock - stock;
                id = prod.id
                break  //fin de la iteracion
            }
        };
        if (newStock <= 0){
            //sin stock
            newStock = 0
            const [row] = await pool.query("UPDATE lugaresProducto SET stock = ? WHERE id = ?", [newStock, id])
            res.send( {status: 200, message: 'succes', response: row} );
        }else{
            //actualizar stock en lugar
            const [updateStock] = await pool.query("UPDATE lugaresProducto SET stock = ? WHERE id = ?", [newStock, id])
            res.send( {status: 200, message: 'succes', response: updateStock} );
        }
    }catch(error) {
        return res.status(500).json({ message: "Something goes wrong" });
  }
} 

// ver ubicacion del producto
export const getUbicacionProducto = async (req, res) =>{
    const {ti} = req.params
    console.log(ti);
    try{
         //busqueda de prodcuto
        const [Producto] = await pool.query("SELECT * FROM productos WHERE Tipo = ?",[ti])
        let id_producto = Producto[0].id
        const [row] = await pool.query("SELECT * FROM lugaresProducto WHERE id_producto = ?",[id_producto])

        return res.send( {status: 200, message: 'succes', response: row} );    
    }catch(err){
        return res.status(500).json({ message: "Something goes wrong" });

    }
}

//actualizar stock de un producto
export const upDateStockProducto = async (req, res) =>{
    const {ti} = req.params
    console.log(ti);
    let newStock = 0
    try{
         //busqueda de prodcuto
        const [Producto] = await pool.query("SELECT * FROM productos WHERE Tipo = ?",[ti])
        let id_producto = Producto[0].id
        const [row] = await pool.query("SELECT * FROM lugaresProducto WHERE id_producto = ?",[id_producto])
        console.log(row);
        row.map((el) => { newStock += el.stock  })
        console.log(newStock);
        //actualizacion del stock
        const [update] = await pool.query("UPDATE productos SET stock = ? WHERE id = ?",[newStock ,id_producto])
        return res.send( {status: 200, message: 'succes', response: update} );    
    }catch(err){
        return res.status(500).json({ message: "Something goes wrong" });

    }
}
