    const express = require('express');
    const router = express.Router();
    const model = require('./../models/usuarios');
    const sha1 = require('sha1');
    const {v4: uuid} = require('uuid');
    const { send } = require('./../services/mail')
    //const {validateRegistro} = require('./../middlewares/usuarios');

    const showRegistro = (req, res) => {
        res.render('registro');
    }
    const create = async (req, res) => {
        const usuario = req.body;
        console.log(usuario);
        let duplicado = false;
        const uid = uuid();
        console.log(uid)
        const usuarioFinal = { //usuario que voy a pasar a la BDD
            username: usuario.username,
            pass: sha1(usuario.pass),
            mail: usuario.mail,
            confirmacionCorreo: uid,
            telefono: usuario.telefono
        }
        console.log(usuarioFinal);
        const agregado = await model.create(usuarioFinal);
        console.log(agregado);
        send({
            mail : usuario.mail,
            cuerpo:
            `<h1> Bienvenido ${usuario.username}</h1>
                <a href="http://${process.env.URL_SERVER}:${process.env.PORT}/registro/verify/${usuarioFinal.confirmacionCorreo}"> 📧 Link de confirmacion de correo  💌 </a>`,
                });
            res.redirect('/productos');
        }
        //verifica si el nombre de usuario o el mail ya existen
    /*    const usuariosExistentes = await model.all();
        usuariosExistentes.forEach(usuario => {
            if (usuario.username == usuarioFinal.username || usuario.mail == usuarioFinal.mail) duplicado = true;
        })
        if (!duplicado) {
            const agregado = await model.create(usuarioFinal);
            console.log(agregado);
            send({
                mail : usuarioFinal.mail, 
                cuerpo:
                `<h1> Bienvenido ${usuarioFinal.username}</h1>
                <a href="${process.env.URL_SERVER}:${process.env.PORT}/registro/verify/${usuarioFinal.confirmacionCorreo}">Link magico</a>`,
                });
            res.redirect('/productos');
        }
        else {
            res.render('registro', {message : "el nombre de usuario y/o mail ingresado ya extisten"})
        }
    }
    */
    const verify = async(req, res) => {
        const {uid} = req.params;
        console.log(uid);
        const messageId = await model.verify(uid);
        res.redirect('/productos');
    }
    router.get('/', showRegistro);
    router.post('/create', create);
    router.get('/verify/:uid', verify);
    module.exports = router;


/*const express = require('express');
const router = express.Router();
const {send} = require ('./../services/mail');

const register = (req, res) => {
    res.render('registro');
};

const create = (req, res) => {
    const {body : usuario} = req;
    console.log(usuario);
    send({mail : usuario.mail, cuerpo : '<a href="google.com"> confirma tu usuario </a>'});
    res.redirect('/');
};

router.get('/', register);
router.post('/create', create);
module.exports = router;
*/