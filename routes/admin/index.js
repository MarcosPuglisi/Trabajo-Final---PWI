const express = require('express');
const router = express.Router();

const showIndex = (req, res) => res.render('adminIndex'); /*{
    if(req.session.user){
        res.render('adminIndex');
    }
    res.render('login', {message: 'inicie sesion para acceder'})
}*/

router.get('/', showIndex);
module.exports = router;