import model from '../models';

const { lista_reproduccion } = model
const { videos_of_lista } = model;

class Lista_reproduccion {
    static create(req,res){
        const { title } = req.body;
        const { id_user } = req.params
        console.log(title, " <<<<<<<<<<<<<<<<<<<<<")
        return lista_reproduccion
        .create({
            title,
            id_user
        })
        .then(data => {
            res.status(200).json({
                success: true,
                msg: "Se insertaron los datos",
                data                
            })
        })
        .catch(error => {
            console.log(error)
        });
    }
    static list(req,res){
        const { id_user } = req.params
        return lista_reproduccion
        .findAll({
            where:{id_user: id_user}
        })
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

    static delete_lista(req,res){
        return lista_reproduccion        
        .findByPk(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(400).send({
                    message: 'No hay nada que eliminar',
                });
            }else{                
                return data
                .destroy()
                .then(() => {
                    res.status(200).send({
                        message: 'Se elimino la lista',
                        data
                    })
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

    static one_list (req,res){
        const  { id } = req.params
        lista_reproduccion
        .findAll({
            where : { id : id }
        })
        .then((data) => {
            if (data != ''){
                res.status(200).json({
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
    static update_list(req,res){
        const { title } = req.body        
        return lista_reproduccion
        .findByPk(req.params.id)
        .then((data) => {
            //console.log(data)
            data.update({
                title: title || data.title
            })
            .then((update) => {
                res.status(200).send({
                    message: 'Se actulizaron los datos',
                    data: {
                        title: title || update.title                                           
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
    //videos que pertenecen a una lista de reproduccion
    static videos_list(req,res){
       
        return videos_of_lista 
        .findAll({
           where:{id_video: req.params.id_video}
        })
        .then(v => {
            
            return lista_reproduccion
            .findAll({                                   
                attributes: ['id','title','data']            
            })
            .then(lista => {
                
                var data = lista
                for (var i = 0; i < lista.length; i++){
                    for(var j = 0; j < v.length; j++ ){
                        if(lista[i].id == v[j].id_lista){
                            data[i]= {
                                id:lista[i].id,
                                title: lista[i].title,
                                data:true
                            }
                        }
                    }
                }       
                res.status(200).json(data)
            })            
        })
        .catch(error => {
            console.log(error)
            res.status(400).json({
                msg: "no se pudo mostrar los datos",
                error
            })
        })
    }
}

export default Lista_reproduccion;
