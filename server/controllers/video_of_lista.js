import model from '../models';

const { videos_of_lista } = model;
const { albun } = model;


class Videos_lista {
    static create(req, res) {
        const { id_album, id_lista } = req.body
        console.log(req.body)
        return albun
            .findAll({
                where: { id: id_album }
            })
            .then(data => {
               /*  res.status(200).json(data)
                console.log(data[0].nombre) */
                if (data == '') {
                    res.status(400).json({
                        success: false,
                        msg: "No se pueden insertar los datos"
                    })
                } else {   
                    return  videos_of_lista
                    .findAll({
                        where: { id_lista:id_lista,id_video: id_album }
                    }) 
                    .then(resp => {
                        //console.log(data, " esto es el dato que queiro ver <<<<<<")
                        if(resp == ''){
                            return videos_of_lista
                            .create({
                                album: data[0].album,
                                nombre: data[0].nombre,
                                artista: data[0].artista,
                                año: data[0].anio,
                                genero: data[0].genero,
                                videoPath: data[0].videoPath,
                                id_video : data[0].id,
                                id_lista: id_lista
                            })
                            .then(data => {
                                res.status(200).json({
                                    success: true,
                                    msg: "Se insertaron los datos",
                                    data
                                })
                            })
                            .catch(erro => console.log(erro))
                        }else{
                            console.log(" ya titne datos entons no insertar")
                            res.status(400).json({
                                success: false,
                                msg: "Ese video ya esta en esta lista de reproduccion",
                                
                            })
                        }
                    })               
                    /* return videos_of_lista
                        .create({
                            album: data[0].album,
                            nombre: data[0].nombre,
                            artista: data[0].artista,
                            año: data[0].anio,
                            genero: data[0].genero,
                            videoPath: data[0].videoPath,
                            id_video : data[0].id,
                            id_lista: id_lista
                        })
                        .then(data => {
                            res.status(200).json({
                                success: true,
                                msg: "Se insertaron los datos",
                                data
                            })
                        })
                        .catch(erro => console.log(erro)) */
                }
            })
            .catch(erro => console.log(erro))

    }
    static video_list_A(req, res) {
        return videos_of_lista
            .findAll()
            .then(data => {
                res.status(200).json(data)
            })
    }

    static video_list(req, res) {
        const { id_lista } = req.params
        return videos_of_lista
            .findAll(
                { where: { id_lista: id_lista } }
            )
            .then(data => {
                res.status(200).json(data)
            })
    }
    static one_video_list(req, res) {
        const { id } = req.params
        return videos_of_lista
            .findAll(
                { where: { id: id } }
            )
            .then(data => {
                res.status(200).json(data)
            })
    }

    static delete_video(req, res) {
        return videos_of_lista

            .findByPk(req.params.id)
            .then(video => {
                if (!video) {
                    return res.status(400).send({
                        message: 'No hay nada que eliminar',
                    });
                } else {
                    return video
                        .destroy()
                        .then(() => {
                            res.status(200).send({
                                message: 'El video se elimino',
                                video
                            })

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
}
export default Videos_lista;
