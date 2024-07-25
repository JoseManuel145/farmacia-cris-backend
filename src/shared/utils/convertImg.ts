// Define el tipo de la función que recibe un Buffer y devuelve un string
export function convertImageToBase64(buffer: Buffer): string {
    const base64Data = buffer.toString('base64');
    const base64Image = `data:image/jpeg;base64,${base64Data}`; // Ajusta el tipo de imagen según corresponda
    return base64Image;
}