import model from '../models';
const jwt = require('jsonwebtoken')

const { usuario } = model;

module.exports = function(req, res, next){
    console.log(req.path, "   esto es lo que quiero")
    if (req.path != '/login'){
        if(req.headers.authorization){
            let token = req.headers.authorization.split(' ')[1];
            console.log(token)
            jwt.verify(token,'nodeauthsecret',function(error, decoded){
                if(error)return res.status(403).json({msg:"no esta autorizado", error})
                console.log(decoded, " <<<<<<<<<<<<<", req.method)
                if(req.method != 'GET'){
                    res.status(400).json({message: "No tienes Permisos"})
                }else{
                    next();
                }
            })
        }
    }else res.status(400).json({msg: "no tienes permisos"}) 
}

