const express = require('express');
const router = express.Router();
const model = require('./../../models/usuarios');

const get = async(req,res) => {
    const usuarios = await model.getAll();
    res.render('adminUsuarios' , {usuarios});
}

router.get('/', get);
module.exports = router;