import model from '../models';
import path from 'path';
import fs from 'fs-extra';

const { portadas } = model;
const { albun } = model;

class Portada {
    static cratePortada(req, res) {
        const { title, description } = req.body;
        const { id_user } = req.params;
        //console.log(req.file, " <<<<<<<<<<<<<<<<<<<<<<")
        return portadas
            .create({
                title,
                description,
                imagePath: req.file.path,
                id_user
            })
            .then(data => {
                res.status(200).json({
                    msg: "Se insertaron los datos",
                    success: true,
                    data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    static list_portda(req, res) {
        return portadas
            .findAll()
            .then(data => res.status(200).send(data));
    }
    static list_user(req, res) {
        const { id_user } = req.params
        return portadas
            .findAll({
                where: { id_user: id_user },
                attributes:['id','title','description','imagePath','id_user'],
                include:[{
                    model:albun,
                    attributes:['artista']
                }]
            })
            .then(data => {
                /* console.log(data[1].albuns, "esto es lo que quiero ver ") */
                
                res.status(200).send(data)
            });
    }
    static One_portada(req, res) {
        const { id } = req.params
        portadas
            .findAll({
                where: { id: id }
            })
            .then((data) => {
                if (data != '') {
                    res.status(200).json({
                        porta: true,
                        success: true,
                        data
                    })
                } else {

                    res.status(400).json({
                        msg: "no hay nada que mostrar"
                    })
                }

            })
            .catch(error => {
                console.log(error)
                res.status(400).json({
                    msg: "no se pudo mostrar los datos",
                    error: error
                })
            })
    }
    static updatePortada(req, res) {
        const { title, description } = req.body
        console.log(req.body, req.params, " esto es lo que quiero ver <<<<<<<<<<<<<<<<")

        return portadas
            .findByPk(req.params.id)
            .then((data) => {
                //console.log(data)
                data.update({
                    title: title || data.title,
                    description: description || data.description

                })
                    .then((updateVideo) => {
                        res.status(200).send({
                            message: 'Se actulizaron los datos',
                            data: {
                                title: title || updateVideo.title,
                                description: description || updateVideo.description
                            }
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
            .catch(error => {
                console.log(error)
            });
    }
    static delete_portada(req, res) {
        return portadas
            .findByPk(req.params.id)
            .then(data => {
                if (!data) {
                    console.log("error no existe ese elemanto para poder elminar ")
                    return res.status(400).send({
                        success: false,
                        message: 'No hay nada que eliminar',
                    });
                } else {
                    return data
                        .destroy()
                        .then(() => {
                            res.status(200).send({
                                success: true,
                                message: 'La portada se elimino',
                                data
                            })
                            fs.unlink(path.resolve(data.imagePath))// esto linea de codigo borra el archivo de la carpeta
                        })
                        .catch(error => {
                            if (error) {
                                console.log(error)
                            }
                        })
                }
            })
            .catch(error => res.status(400).send(error))

    }
    static buscar_portada(req, res) {
        return portadas
            .findAll({
                include:[{
                    model: albun,
                    attributes:['artista']
                }]
            })
            .then(data => {
                var filtrado = data.filter(
                    (item) =>
                        item.title.toLowerCase().includes(req.query.title.toLowerCase())
                )
                res.status(200).json(filtrado)
            })
    }

}

export default Portada