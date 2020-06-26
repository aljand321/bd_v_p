import model from '../models';

const jwt = require('jsonwebtoken');
const passport = require('passport');

require('../config/passport')(passport);

const { usuario } = model;
const { role } = model;
const { user_role } = model;


class Usuario {
    static create_usuario(req, res) {
        const { user, email, password, password2 } = req.body
        if (!user || !email || !password || !password2) {
            res.status(200).json({
                success: false,
                msg: "Todos los campos son obligatorios"
            })
        } else {
            if (password == password2) {
                return usuario
                    .findOne({
                        where: { user: user }
                    })
                    .then(data => {
                        console.log(data," <<<<<<<<<<<<<<<<")
                        if (data) {
                            res.status(200).json({
                                success: false,
                                msg: "Ese usuario ya esta registrado",
                                data:data
                            })
                        } else {    
                            return usuario
                            .findOne({
                                where: { email: email }
                            })   
                            .then(resp => {
                                if(resp){
                                    res.status(200).json({
                                        success:false,
                                        msg:"Ya esta registrado ese email"
                                    })
                                }else{
                                    return usuario
                                        .create({
                                            user,
                                            email,
                                            password
                                        })
                                        .then(data => {
                                            res.status(200).json({
                                                msg: "Registrado...",
                                                success: true,
                                                data
                                            })
                                        })
                                        .catch(err => {
                                            console.error(err)
                                            res.status(400).json({
                                                msg: "No se pudo crear los datos",
                                                err
                                            })
                                        })
                                }
                            })                     
                            
                        }
                    })

            } else {
                res.status(200).json({
                    success: false,
                    msg: "Las contraceñas no coinciden"
                })
            }

        }

    }
    static mostrar_users(req, res) {
        return usuario
            .findAll({
                include: [
                    {
                        model: role,
                        as: 'role'
                    }]
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.error(err);
                res.status(400).json(err);
            })
    }

    static user_length(req, res) {
        return usuario
            .findAll()
            .then(data => {
                if (data !== []) {
                    res.status(200).json({
                        success: false
                    })
                } else {
                    res.status(200).json({
                        success: true
                    })
                }
            })
    }

    static login(req, res) {
        const { user, password } = req.body
        if (!user || !password) {
            res.status(200).json({
                success: false,
                msg: "Todos los campos son obligatorios"
            })
        } else {
            return usuario
                .findOne({
                    where: { user: req.body.user }
                })
                .then((data) => {
                    if (!data) {
                        res.status(200).json({
                            msg: "El usario o la contraceña no coinsiden",
                            success: false
                        })
                    } else {
                        data.comparePassword(req.body.password, (err, isMatch) => {
                            //console.log(isMatch, " esto es <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
                            if (isMatch && !err) {
                                var token = jwt.sign(JSON.parse(JSON.stringify(data)), 'nodeauthsecret', { expiresIn: 3600 * 5 /* el token expira en 5 horas */ });
                                /* jwt.verify(token, 'nodeauthsecret', function (err, tk) {
                                    console.log (tk, " esto es <<<<<<<<<<<<<<<<<<<<<<<<<<<<")
                                }) */
                                res.status(200).json({
                                    success: true,
                                    token: 'JWT ' + token,
                                    data
                                })
                            } else {
                                res.status(200).json({
                                    success: false,
                                    msg: "El usario o la contraceña no coinsiden"
                                })
                            }
                        })
                    }
                })
        }

    }
    static delete_user(req, res) {
        return usuario
            .findByPk(req.params.id)
            .then(data => {
                if (!data) {
                    res.status(400).json({
                        msg: "No hay nada para eliminar"
                    })
                } else {
                    return data
                        .destroy()
                        .then(() => {
                            res.status(200).json({
                                msg: "Se elimino el usario " + data.user,
                                success: true
                            })
                        })
                        .catch(erro => console.error(erro))
                }
            })
            .catch(erro => console.error(erro))
    }
}

export default Usuario;