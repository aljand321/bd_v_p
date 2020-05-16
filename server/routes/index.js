import Users from '../controllers/user';
import Books from '../controllers/book';
import Videos from '../controllers/videos';

import VideoData from '../controllers/dataVideo'
import Portada from '../controllers/portada'
import Album from '../controllers/album'

import Lista_reproduccion from '../controllers/lista_reproduccion'
import Videos_lista from '../controllers/video_of_lista'
import Video_album from '../controllers/video_album'

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

const storageA = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname))
    }
});

const storageB = multer.diskStorage({
    destination: 'uploads/vid',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname))
    }
});
const storageB_1 = multer.diskStorage({
    destination: 'uploads/vid/video_data/portada',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname))
    }
});
const storageB_2 = multer.diskStorage({
    destination: 'uploads/vid/video_data/videos',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname))
    }
});

const destA = multer({ storage : storageA})
const destB = multer({ storage : storageB})
const destB_1 = multer({ storage : storageB_1})
const destB_2 = multer({ storage : storageB_2})

/* 
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                            end guardar archivos
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        https://anotherdev.xyz/upload-file-multiple-destinations-multer/
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
*/
export default (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the bookStore API!',
    }));

    //sequelize   
    // sequelize model:create --name videos --attributes title:integer,description:string,imagePath:string
    // sequelize model:create --name portadas --attributes title:integer,description:string,imagePath:string
    // sequelize model:create --name albun --attributes album:string,artista:string,año:string,genero:string,videoPath:string

    // sequelize model:create --name lista_reproduccion --attributes title:string
    // sequelize model:create --name videos_of_lista --attributes album:string,artista:string,año:string,genero:string,videoPath:string,id_lista:integer
    // sequelize model:create --name videos_of_lista --attributes video:string, id_album:integer

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
    app.post('/portada', destB.single('music'), Portada.cratePortada);
    app.get('/portada', Portada.list_portda);
    app.get('/portada/:id', Portada.One_portada);
    app.put('/portada/:id', Portada.updatePortada);
    app.delete('/portada/:id', Portada.delete_portada);

    //album
    app.post('/album/:id_portada', destB_1.single('vid'), Album.create);
    app.get('/album_portada/:id', Album.VideosDePortada);
    app.get('/album', Album.list);
    app.get('/album/:id', Album.one_video);
    app.delete('/album/:id', Album.delete_music);
    app.put('/album/:id', Album.update_music);

    //video album 
    app.post('/addVideo_album/:id_album', destB_2.single('video'), Video_album.create);
    app.get('/videos_all', Video_album.list_all)
    app.delete('/delte_video_album_data/:id', Video_album.delete_video)

    //lista de reproduccion
    app.post('/lista_reproduccion', Lista_reproduccion.create);
    app.get ('/lista_reproduccion', Lista_reproduccion.list);
    app.get ('/lista_reproduccion/:id', Lista_reproduccion.one_list);
    app.delete('/lista_reproduccion/:id', Lista_reproduccion.delete_lista);
    app.put('/lista_reproduccion', Lista_reproduccion.update_list);

    //videos de lista de reproduccion
    app.post('/video_lista', Videos_lista.create); // esta ruta es para poder añadiar videos a lista de reproduccion
    app.get('/video_lista', Videos_lista.video_list_A)
    app.get('/video_lista/:id_lista', Videos_lista.video_list);
    app.get('/video_lista_one/:id', Videos_lista.one_video_list);
    app.delete('/video_lista/:id', Videos_lista.delete_video);

};
