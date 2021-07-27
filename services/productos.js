/*
const {create , createImages, update, updateImage} = require('./../models/productos');
const {imgFile} = require('./../utils/fileHandler');

const createProducto = async(body, file) => {
    try {
        const {insertId : id_producto} = await create(body); // un create devuelve un insertId con el id del ingresado
        const uid = imgFile(file);
        const obj = {id_producto, uid};
        const {insertId : idImg} = await createImages(obj);
        return idImg;
    } catch (error) {
        console.error(error);
    }
}
const updateProducto = async(id, body, file) => {
    try {
        const id_producto = await update(id,body);
        if (file){
            const uid = imgFile(file);
            const obj = {uid};
            const idImg = await updateImage(id, obj);
            return idImg;
        }
        else{
            return id_prducto;
        }
    } catch (error) {
        console.error(error);
    }
}


module.exports = {createProducto, updateProducto}
*/