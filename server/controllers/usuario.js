import model from '../models';

const jwt = require('jsonwebtoken');
const passport = require('passport');

require('../config/passport')(passport);

const { usuario } = model;

class Usuario {
    static create_usuario(req,res){
        const { user,email,password } = req.body
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
                msg:"No se pudo crear los datos",
                err
            })
        })
    }
    static mostrar_users(req,res){
        return usuario
        .findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.error(err);
            res.status(400).json(err);            
        })
    }

    static login (req,res){
        return usuario
        .findOne({
            where:{ user : req.body.user }
        })
        .then((data) => {
            if(!data){
                res.status(400).json({
                    msg: " no hay nada que mostrar",
                    success: false 
                })
            }else{
                data.comparePassword(req.body.password, (err, isMatch) => {
                    if (isMatch && !err){
                        var token = jwt.sign(JSON.parse(JSON.stringify(data)), 'nodeauthsecret',{expiresIn: 86400 * 30});
                        jwt.verify(token, 'nodeauthsecret', function(err, data){
                            console.log(err, data)
                        })
                        res.status(200).json({
                            success:true,
                            token: 'JWT' + token,
                            data
                        })
                    }else{
                        res.status(400).json({
                            success:false,
                            msg: "autenticacion fallida"
                        })
                    }
                })
            }
        })
    }
}

export default Usuario;