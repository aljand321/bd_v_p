import model from '../models';

const { role } = model;

class Roles {
    static create_rol (req,res){
        const { nombre } = req.body
        console.log(nombre, " esto es el nombre <<<<< ")
        return role
        .findOne({
            where: {nombre: nombre}
        })
        .then(data => {
            if(data){
                res.status(200).json({
                    success: false,
                    msg:"Ese rol ya esta registrado"
                })
            }else{
                return role
                .create({
                    nombre
                })
                .then(data => {
                    res.status(200).json({
                        success:true,
                        msg:'Se creo el rol'+' '+nombre,
                        data
                    })
                })
                .catch(erro => console.error(erro));
            }
        })
        
    }
    static lit_role(req,res){
        return role
        .findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(erro => console.error(erro))
    }
}

export default Roles;
