import model from '../models';
import path from 'path';
import fs from 'fs-extra';
const { videos } = model

//rutas para insertar datos a videos

class Videos {
    static create(req,res){
       /*  console.log(req.file, " esto nes la informacion de file")
        res.send(req.file) */
        
        const { title, description } = req.body
        return videos
        .create({
            title, 
            description, 
            imagePath: req.file.path
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
    }

    static getVideos (req, res) {
        return videos
        .findAll()
        .then(data => {
            res.status(200).json({
                success:true,
                data
            })
        })
        .catch(error => {
            console.log(error)
            res.status(400).json({
                msg: "no se pudo mostrar los datos",
                error : error
            })
        })
    }

    static oneVideo (req, res) {
        const  { id } = req.params
        videos
        .findAll({
            where : { id : id }
        })
        .then((data) => {
            if (data != ''){
                res.status(200).json({
                    porta:true,
                    success:true,
                    data
                })
            }else{
                
                res.status(400).json({
                    msg:"no hay nada que mostrar"
                })
            }
           
        })
        .catch(error => {
            console.log(error)
            res.status(400).json({
                msg: "no se pudo mostrar los datos",
                error : error
            })
        })
    }
     //servico para borrar un video
     static delete(req, res) {
       
        return videos
        
        .findByPk(req.params.id)
        .then(video => {
            if(!video) {
                return res.status(400).send({
                    message: 'No hay nada que eliminar',
                });
            }else{                
                return video
                .destroy()
                .then(() => {
                    res.status(200).send({
                        message: 'El video se elimino',
                        video
                    })
                    fs.unlink(path.resolve(video.imagePath))// esto linea de codigo borra el archivo de la carpeta
                })
                .catch(error => {
                    if (error){
                        
                        console.log(error)
                    }
                })                
            }                                 
            
        })
        .catch(error => res.status(400).send(error))
        
    }
    //ruta para poder actializar los datos de un video
    //actualizar un libro
    static modify(req, res) {
        const { title, description } = req.body
        console.log(req.body, req.params)
        
        return videos
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
            .catch(error =>{
                console.log(error)
            });
        })
        .catch(error => {
            console.log(error)
        });
    }
}

export default Videos;