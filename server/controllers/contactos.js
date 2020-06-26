import path from 'path';
import fs from 'fs-extra';
import model from '../models';
const { contacto } = model;
const { usuario } = model;

class Contacto {
    static create(req, res) {
        const { nombres, apellidos, telefono } = req.body
        if (isNaN (telefono)){
            res.status(200).json({
                success:false,
                msg:"Telefono solo puede contener numeros"
            })
        }else{
            return contacto
            .findOne({
                where: { id_user: req.params.id_user }
            })
            .then(resp => {
                if (!resp) {
                    return contacto
                        .create({
                            nombres,
                            apellidos,
                            telefono,
                            imagen_perfil: req.file.path,
                            id_user: req.params.id_user
                        })
                        .then(data => {
                            res.status(200).json({
                                success: true,
                                msg: "Se insertaron los datos",
                                data
                            })
                        })
                        .catch(err => console.error(err))
                } else {
                    // En esta linea de codigo se esta borrando la imagen que se esta almacenando ya que el usuario ya tiene una imagen y esta se vuelve a guardar
                    //aunque el el contacto ya esta guardado
                    fs.unlink(path.resolve(req.file.path))// 
                    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                    res.status(400).json({
                        success: false,
                        msg: "ya esta registrado el contacto de este usario"
                    })
                }
            })
            .catch(err => console.error(err))
        }
        

    }
    static list_contactos(req, res) {
        return contacto
            .findAll()
            .then(data => res.status(200).json(data))
    }
    static contacot_user(req, res) {
        const { id_user } = req.params
        return contacto
            .findOne({
                where: { id_user: id_user }
            })
            .then(data => {
                if (!data) {
                    res.status(404).json({
                        success: false,
                        msg: 'No se registro el contacto de este usuario'
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        data
                    })
                }
            })
    }
    static actualizar_contacto(req, res) {
        const { nombres, apellidos, telefono } = req.body;
        const { id_user } = req.params;

        return contacto
            .findOne({
                where: { id_user: id_user }
            })
            .then(data => {
                if (!data) {

                    res.status(400).json({
                        success: false,
                        msg: "El usuario no tiene contacto para poder actualizar"
                    })
                } else {
                    fs.unlink(path.resolve(data.imagen_perfil))

                    data.update({
                        nombres: nombres || data.nombre,
                        apellidos: apellidos || data.apellidos,
                        telefono: telefono || data.telefono,
                        imagen_perfil: req.file.path,
                    })
                        .then((update_data) => {
                            res.status(200).json({
                                success: true,
                                msg: 'Se actualizaron los datos',
                                update_data
                            })
                        })
                        .catch(error => res.status(400).send(error));

                }
            })

    }
    static actualizar_contacto1(req, res) {
        const { nombres, apellidos, telefono } = req.body;
        console.log(req.body, " <<<<<<<<<<<<<<<<<<<<<<<   sad")
        const { id_user } = req.params;
        return contacto
            .findOne({
                where: { id_user: id_user }
            })
            .then((data) => {
                data.update({
                    nombres: nombres || data.nombre,
                    apellidos: apellidos || data.apellidos,
                    telefono: telefono || data.telefono
                })
                    .then((update_data) => {
                        res.status(200).json({
                            success: true,
                            msg: 'Se actualizaron los datos',
                            update_data
                        })
                    })
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
    static delete (req,res){
        const { id_user } = req.params
        return contacto
        .findOne({
            where:{id_user: id_user}
        })
        .then(data => {
            if (!data){
                res.status(400).json({
                    success:false,
                    mg:"Ese contancto no existe"
                })
            }else{
                return data
                .destroy()
                .then(() => {
                    res.status(200).json({
                        data,
                        msg:"Se elimino"
                    })
                })
                .catch(err => console.error(err))
            }
        })
        .catch(err => console.error(err))
    }
}

export default Contacto;