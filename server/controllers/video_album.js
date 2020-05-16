import model from '../models';
import path from 'path';
import fs from 'fs-extra';

const { video_album } = model

class Video_album {
    static create (req, res){
        const { id_album } = req.params;
        return video_album
        .findAll({
            where :{id_album:id_album}
        })
        .then(video => {
            if(video != ''){
                res.status(400).json({
                    success: false,
                    msg:"solo se puede insertar un video en esa portada"
                })
            }else{
                return video_album
                .create({
                    video: req.file.path,
                    id_album: id_album
                })
                .then( data => {
                    res.status(200).json({
                        success:true,
                        msg: "Se insertaron los datos",
                        data
                    })
                })
                .catch(err => console.error(err));
            }
        })  
       
    }
    static list_all(req,res){
        return video_album
        .findAll()
        .then(videos => {
            res.status(200).json(videos)
        })
    }
    static delete_video(req, res) {
        return video_album

            .findByPk(req.params.id)
            .then(video => {
                if (!video) {
                    console.log(" no hay ese video para eliminar")
                    console.log(" no hay ese video para eliminar")
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
                            fs.unlink(path.resolve(video.video))// esto linea de codigo borra el archivo de la carpeta
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
                    msg: "No existe ese video para eliminar"                    
                })                             
                console.error(error)
            })
    }
}

export default Video_album;