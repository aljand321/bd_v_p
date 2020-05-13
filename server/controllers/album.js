import model from '../models';
import path from 'path';
import fs from 'fs-extra';

const { albun } = model;

class Album {
    static create(req, res) {
        const { album, nombre, artista, anio, genero } = req.body
        const { id_portada } = req.params;
        return albun
            .create({
                album,
                nombre,
                artista,
                anio,
                genero,
                videoPath: req.file.path,
                idPortada: id_portada
            })
            .then(data => {
                res.status(200).json({
                    success: true,
                    msg: "Se insertaron los datos",
                    data
                })
            })
            .catch(erro => console.log(erro))
    }
    static VideosDePortada(req, res) {
        const { id } = req.params
        return albun
            .findAll({
                where: { idPortada: id }
            })
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    res.status(400).json({
                        success: false,
                        msg: "No hay nada que mostrar"
                    })
                }
            });
    }
    static list(req, res) {
        return albun
            .findAll()
            .then(data => res.status(200).send(data));
    }

    static one_video(req, res) {
        const { id } = req.params
        return albun
            .findAll(
                { where: { id: id } }
            )
            .then(data => {
                res.status(200).json(data)
            })
    }

    static update_music(req, res) {
        const { album, nombre, artista, anio, genero } = req.body

        return albun
            .findByPk(req.params.id)
            .then((data) => {
                //console.log(data)
                data.update({
                    album: album || data.album,
                    nombre: nombre || data.nombre,
                    artista: artista || data.artista,
                    anio: anio || data.anio,
                    genero: genero || data.genero

                })
                    .then((updateVideo) => {
                        res.status(200).send({
                            message: 'Se actulizaron los datos',
                            success:true,
                            data: {
                                album: album || updateVideo.album,
                                nombre: nombre || updateVideo.nombre,
                                artista: artista || updateVideo.artista,
                                anio: anio || updateVideo.anio,
                                genero: genero || updateVideo.genero
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

    static delete_music(req, res) {
        return albun

            .findByPk(req.params.id)
            .then(video => {
                if (!video) {
                    console.log(" no hay ese video para eliminar")
                    return res.status(400).send({
                        success:false,
                        message: 'No hay nada que eliminar',
                    });
                } else {
                    return video
                        .destroy()
                        .then(() => {
                            res.status(200).send({
                                success:true,
                                message: 'El video se elimino',
                                video
                            })
                            fs.unlink(path.resolve(video.videoPath))// esto linea de codigo borra el archivo de la carpeta
                        })
                        .catch(error => {
                            console.log("no se pudo eliminar ese video")
                            res.status(400).json({
                                success:false,                               
                                msg: "Algo sucedio no se puede elimnar los datos",
                                
                            })                            
                                
                            console.error(error)
                           
                        })
                }

            })
            .catch(error => {
                console.log("no se pude mostrar ese archivo")
                res.status(400).json({
                    success:false,                               
                    msg: "No existe ese video para eliminar",
                    
                })                            
                    
                console.error(error)
            })
    }
}

export default Album;