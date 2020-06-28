import Users from '../controllers/user';
import Books from '../controllers/book';
import Videos from '../controllers/videos';

import VideoData from '../controllers/dataVideo'
import Portada from '../controllers/portada'
import Album from '../controllers/album'

import Lista_reproduccion from '../controllers/lista_reproduccion'
import Videos_lista from '../controllers/video_of_lista'
import Video_album from '../controllers/video_album'

import Usuario from '../controllers/usuario'

import Contacto from '../controllers/contactos'
import User_roles from '../controllers/user_role'
import Roles from '../controllers/role'

const AuthToken = require('../midleware/token')

const passport = require('passport');
const admin_passport = require('passport');

require('../config/passport')(passport);
require('../config/admin_passport')(admin_passport);
/* 
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                            para guardar archivos
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

*/
import multer from 'multer';
import uuid from 'uuid/v4';
import path from 'path'
import moment from 'moment'

const date = moment().format().split(':')[0]
function radom_function (){
    const letra = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u',
                    'v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
                    'Q','R','S','T','U','V','W','X','Y','Z']
    var ramdomL = []
    for (var i = 0; i < 6; i++){
        ramdomL.push(letra[Math.floor(Math.random() * letra.length)])       
    }    
    return ramdomL[0]+ramdomL[1]+ramdomL[2]+ramdomL[3]+ramdomL[4]+ramdomL[5]    
}

const storageA = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null,radom_function()+'-'+date+'-name-'+file.originalname)
    }
});

const storageB = multer.diskStorage({
    destination: 'uploads/vid',
    filename: (req, file, cb) => {
        cb(null,radom_function()+'-'+date+'-name-'+file.originalname)
    }
});
const storageB_1 = multer.diskStorage({
    destination: 'uploads/vid/video_data/portada',
    filename: (req, file, cb) => {
        cb(null,radom_function()+'-'+date+'-name-'+file.originalname)
    }
});
const storageB_2 = multer.diskStorage({
    destination: 'uploads/vid/video_data/videos',
    filename: (req, file, cb) => {
        cb(null,radom_function()+'-'+date+'-name-'+file.originalname)
    }
});
const storageC = multer.diskStorage({    
    destination: 'uploads/img_users',
    filename: (req, file, cb) => {
        cb(null,radom_function()+'-'+date+'-name-'+file.originalname)
    }
});

const destA = multer({ storage : storageA})
const destB = multer({ storage : storageB})
const destB_1 = multer({ storage : storageB_1})
const destB_2 = multer({ storage : storageB_2})
const destC = multer({ storage : storageC})


/* 
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                            end guardar archivos
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        https://anotherdev.xyz/upload-file-multiple-destinations-multer/
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/


module.exports = (app) => {

    //app.use(AuthToken);

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the bookStore API!',
    }));
    app.post('/api/users', Users.signUp); // API route for user to signup
    app.post('/api/users/:userId/books', Books.create); // API route for user to create a book
    app.get('/api/users', Users.list); // API route for user to get all books in the database

    //libros
    app.get('/api/books', Books.list); // API route for user to get all books in the database
    app.put('/api/books/:bookId', Books.modify); // API route for user to edit a book
    app.delete('/api/books/:bookId', Books.delete); // API route for user to delete a book
    app.get('/api/idLib/:id', Books.listOne);

    //videos
    app.post('/video', destA.single('image'), Videos.create);
    app.put('/video/:id' ,Videos.modify);
    app.get('/video' ,Videos.getVideos);
    app.get('/video/:id' ,Videos.oneVideo);
    app.delete('/video/:id' ,Videos.delete);

    //data video
    app.post('/Video_data/:video_id', destA.single('image'), VideoData.creteDataVideo);
    app.get('/Video_data', VideoData.list_data_video);
    app.get('/Video_data/:id', VideoData.one_data);
    app.get('/Video_data_id/:id', VideoData.one_data_id);
    
    app.put('/video_data/:id', VideoData.updateDataVideo);
    app.delete('/video_data/:id', VideoData.deleteDataVideo);

    //Videos de musicas
    //portadas
    app.post('/portada/:id_user',  destB.single('music'), Portada.cratePortada);
    app.get('/portada',  Portada.list_portda);
    app.get('/portada_user/:id_user', Portada.list_user)
    app.get('/portada/:id',  Portada.One_portada);
    app.put('/portada/:id',  Portada.updatePortada);
    app.delete('/portada/:id', Portada.delete_portada);

    app.get('/buscar_portada', Portada.buscar_portada);

    //album
    app.post('/album/:id_portada', destB_1.single('vid'), Album.create);
    app.get('/album_portada/:id', Album.VideosDePortada);
    app.get('/album/:id_user',  Album.list_video_user); // esto es lo que estoy modificando
    app.get('/album_all', Album.list);
    app.get('/album_one/:id', Album.one_video);
    app.delete('/album/:id', Album.delete_music);
    app.put('/album/:id', Album.update_music);

    app.get('/buscador', Album.buscar_video);

    //video album 
    app.post('/addVideo_album/:id_album', destB_2.single('video'), Video_album.create);
    app.get('/videos_all', Video_album.list_all)
    app.delete('/delte_video_album_data/:id', Video_album.delete_video)

    //lista de reproduccion
    app.post('/lista_reproduccion/:id_user', Lista_reproduccion.create);
    app.get ('/lista_reproduccion/:id_user',  Lista_reproduccion.list);
    app.get ('/lista_reproduccion/:id', Lista_reproduccion.one_list);
    app.delete('/lista_reproduccion/:id', Lista_reproduccion.delete_lista);
    app.put('/lista_reproduccion', Lista_reproduccion.update_list);

    //consuta que muestra los viodes que pertenecen a una lista de reproduccion
    app.get('/videos_of_lista/:id_video', Lista_reproduccion.videos_list);

    //videos de lista de reproduccion
    app.post('/video_lista', Videos_lista.create); // esta ruta es para poder añadiar videos a lista de reproduccion
    app.get('/video_lista', Videos_lista.video_list_A)
    app.get('/video_lista/:id_lista', Videos_lista.video_list);
    app.get('/video_lista_one/:id', Videos_lista.one_video_list);
    app.delete('/video_lista/:id', Videos_lista.delete_video);
    app.delete('/del_video_list/:id_video/:id_lista', Videos_lista.delete_video_lista)


    //login
    app.post('/register', Usuario.create_usuario);
    app.post('/login', Usuario.login);  
    app.get('/mostrar_users', Usuario.mostrar_users); 
    app.get('/delete_user/:id', Usuario.delete_user);
    app.get('/user_length', Usuario.user_length);
    //contactos
    app.post('/contacto/:id_user',  destC.single('img_user'), Contacto.create );
    app.get('/contacto', Contacto.list_contactos);
    app.get('/contacto/:id_user',  Contacto.contacot_user);
    app.put('/contacto/:id_user',  destC.single('img_user'), Contacto.actualizar_contacto);
    app.put('/contacto1/:id_user', Contacto.actualizar_contacto1);
    app.get('/delete_contacto/:id_user', Contacto.delete);
    // rutas solo para super admin
    //role add
    app.post('/role', Roles.create_rol);
    app.get('/role',  Roles.lit_role);
    //add table user_role
    app.post('/user_role', User_roles.create_user_role);
    app.get('/user_role',  User_roles.list);
    app.get('/user_role/:id', User_roles.one);
    app.get('/delete_role_user/:id', User_roles.delete);
};

//sequelize   
    // sequelize model:create --name videos --attributes title:integer,description:string,imagePath:string
    // sequelize model:create --name portadas --attributes title:integer,description:string,imagePath:string
    // sequelize model:create --name albun --attributes album:string,artista:string,año:string,genero:string,videoPath:string

    // sequelize model:create --name lista_reproduccion --attributes title:string
    // sequelize model:create --name videos_of_lista --attributes album:string,artista:string,año:string,genero:string,videoPath:string,id_lista:integer
    // sequelize model:create --name videos_of_lista --attributes video:string, id_album:integer

    // sequelize model:create --name usuario --attributes usuario:string,email:string,password:string 
    // sequelize model:create --name contacto --attributes nombres:text,apellidos:text,telefono:number,id_user:integer

    // sequelize model:create --name user_role --attributes id_user:integer,id_role:integer

    // sequelize model:create --name role --attributes nombre:string
    