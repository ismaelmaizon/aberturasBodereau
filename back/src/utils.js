import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
export default __dirname;


export const encriptarPass = async (password) => {
    // Generar el hash de la contraseña
    try {
        const hash = await bcrypt.hash(password, 10);
        // Aquí guardamos el hash en una variable
        return hash;
      } catch (error) {
        console.error('Error al generar el hash:', error);
        throw error;
      }
}

export const validarPass = async (password, hash) => {
    // Verificar si una contraseña ingresada coincide con el hash almacenado
    const result =  await bcrypt.compare(password, hash)
        // `result` será `true` si la contraseña coincide con el hash
    console.log('Coincide la contraseña:', result); // Resultado: false
    return result
};


export const DataTime = () => {
    const currentDate = new Date();

    // Extract individual components
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero indexed, so we add 1
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    // Format date and time
    const formattedDateTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    console.log("Current date and time:", formattedDateTime);
    return formattedDateTime
}


