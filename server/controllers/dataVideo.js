import model from '../models';
import path from 'path';
import fs from 'fs-extra';

const { dataVideo } = model;

class VideoData {
    static creteDataVideo(req, res) {
        return dataVideo
            .findAll({
                where : { videoID : req.params.video_id }
            })
            .then(data => {
                if (data == ""){
                    const { genero, audio, calidad, director } = req.body;
                    const { video_id } = req.params;
                    return dataVideo
                        .create({
                            genero,
                            audio,
                            calidad,
                            director,
                            video_path: req.file.path,
                            videoID : video_id
                        })
                        .then(data => {
                            res.status(200).json({
                                success: true,
                                msg: "se insertaron los datos",
                                data
                            })
                        })
                        .catch(error => {
                            console.log(error)
                        });
                }else{
                    res.status(400).json({
                        success : false,
                        msg : "Esta portada solo puede contener un video"
                    })
                }
            });
       
    }
    static list_data_video(req, res) {
        return dataVideo
            .findAll()
            .then(data => res.status(200).send(data));
    }
    static one_data(req, res) {
        const { id } = req.params
        return dataVideo
            .findAll( { 
                where: { id: id }
            })
            .then(data => {
                if (data == "" || data == null){
                    res.status(400).json({
                        success:false,
                        msg: "No hay datos que mostrar"
                    })
                }else{
                    res.status(200).json(data)
                }
            });
    }
    static one_data_id(req,res) {
        const { id } = req.params
        return dataVideo
        .findAll({
            where : { videoID : id }
        })
        .then(data => {
            if (data == ""){
                res.status(400).json({
                    success: false,
                    msg : "Todavia no se insertaron videos"
                })
            }else{
                res.status(200).json(data)
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json(error)
        })
    }

    static updateDataVideo(req,res){
        const { genero, audio, calidad, director} = req.body
        //console.log(req.body, req.params)
        
        return dataVideo
        .findByPk(req.params.id)
        .then((data) => {
            if (data == ""){
                res.status(400).json({
                    success: false,
                    msg: "No se pudo actulizar los datos no se puede identificar"
                })
            }else{
                data.update({
                    genero: genero || data.genero,                
                    audio: audio || data.audio,
                    calidad : calidad || data.calidad,
                    director : director || data.director
                    
                })
                .then((updateVideo) => {
                    res.status(200).send({
                        message: 'Se midificaron los datos del video',
                        data: {
                            genero: genero || updateVideo.genero,                       
                            audio: audio || updateVideo.audio,
                            calidad: calidad || updateVideo.calidad, 
                            director: director || updateVideo.director                     
                        }
                    })
                })
                .catch(error =>{
                    console.log(error)
                });
            }
            
        })
        .catch(error => {
            console.log(error)
        });
    }

    static deleteDataVideo(req,res){
        return dataVideo        
        .findByPk(req.params.id)
        .then(dataVideo => {
            if(!dataVideo) {
                return res.status(400).send({
                    message: 'No hay nada que eliminar',
                });
            }else{                
                return dataVideo
                .destroy()
                .then(() => {
                    res.status(200).send({
                        message: 'El video se elimino',
                        dataVideo
                    })
                    fs.unlink(path.resolve(dataVideo.video_path))// esto linea de codigo borra el archivo de la carpeta
                })
                .catch(error => {
                   console.log(error)
                })                
            }                                 
            
        })
        .catch(error => res.status(400).send(error))
    }
}
export default VideoData
