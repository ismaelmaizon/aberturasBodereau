import { pool } from "../db.js";
import {DataTime} from "../utils.js";

export const getLugares = async (req, res) => {
  let lugares = []
  try {
    const [rows] = await pool.query("SELECT * FROM lugares");
    rows.map((pac) =>{
        lugares.push(pac)
    })
    res.send( {status: 200, message: 'succes', response: lugares} );
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

