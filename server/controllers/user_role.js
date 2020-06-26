import model from '../models';

const { user_role } = model;
const { usuario } = model;
const { role } = model;

class User_roles {
    static create_user_role(req,res){
        const { user_id, role_id } = req.body
        console.log(req.body)
        return usuario
        .findOne({
            where :{ id : user_id }
        })
        .then(user_data => {
            if(!user_data){
                console.log("no existe ese usuario")
                res.status(400).json({
                    success:false,
                    msg:"no existe ese usuario"
                })
            }else{
                return role
                .findOne({
                    where:{id: role_id}
                })
                .then(role_data => {
                    if(!role_data){
                        res.status(400).json({
                            success:false,
                            msg:"No existe ese rol"
                        })
                    }else{
                        return user_role
                        .findOne({
                            where:{id_user: user_id, id_role: role_id}
                        })
                        .then(usuario_role => {
                            if(usuario_role){
                                res.status(400).json({
                                    success:false,
                                    msg:"ya existe ese rol y ese usuario registrado"
                                })
                            }else{
                                /* res.status(400).json({
                                    success:false,
                                    msg:"puede continuar"
                                }) */
                                return user_role
                                .create({
                                    id_user:user_id,
                                    id_role:role_id
                                })
                                .then(data => {
                                    res.status(200).json({
                                        success: true,
                                        msg: 'se creo el rol',
                                        data
                                    })
                                })
                                .catch(err => console.error(err)) 
                            }
                        })
                        .catch(err => console.error(err)) 
                        
                    }
                })
                .catch(err => console.error(err))                
            }
        })
        .catch(err => console.error(err))
        
    }
    static list (req,res){
        return user_role
        .findAll()
        .then(data => {
            res.status(200).json(data)
        })
    }
    static one (req,res){
        return user_role
        .findOne({
            where: { id: req.params.id }
        })
        .then(data => {
            res.status(200).json(data)
        })
    }
    static delete (req,res){
        return user_role
        .findOne({
            where: {id: req.params.id}
        })
        .then(data => {
            console.log(data)
            if (!data){
                return res.status(400).json({
                    msg:"No hay nada para aliminar"
                })
            }
            return data
            .destroy()
            .then(() => {
                res.status(200).json({
                    success:true,
                    msg:"se elmino con exito",
                    data
                })
            })
            .catch( err => console.error(err))
        })
        .catch( err => console.error(err))
    }
}

export default User_roles;