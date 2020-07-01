import model from '../models';
const jwt = require('jsonwebtoken')
const { usuario } = model;
const { role } = model;
function permission(data, user) {
    var r = data.split('/')[1]
    if (user == 'administrador') {
        var ruta_administrador = {
            role: '/role',
            portada: '/portada', // ruta estrixta de administrador
            buscar_portada: '/buscar_portada',
            album: '/album', // ruta estrixta de administrador
            album_one:'/album_one',
            album_portada: '/album_portada',
            album_all:'/album_all',
            buscador: '/buscador',
            addVideo_album: '/addVideo_album',
            videos_all: '/videos_all', // ruta estrixta de administrador
            delte_video_album_data: '/delte_video_album_data',
            lista_reproduccion: '/lista_reproduccion',  // ruta estrixta de administrador
            videos_of_lista: '/videos_of_lista',
            video_lista: '/video_lista',
            video_lista_one: '/video_lista_one',
            video_lista: '/video_lista',
            del_video_list: '/del_video_list',

            mostrar_users: '/mostrar_users', //ruta del administrador
            delete_user: '/delete_user',
            contacto: '/contacto',
            contacto1: '/contacto1',

            delete_contacto: '/delete_contacto', // ruta del administrador

            user_role: '/user_role',
            delete_role_user: '/delete_role_user',

            portada_user:'/portada_user'
        }
        if (ruta_administrador[r]) {
            return true
        } else {
            return false
        }
    } else if (user == 'usuraio') {
        var ruta_usuario = {
            portada: '/portada', // ruta estrixta de administrador
            buscar_portada: '/buscar_portada',
            album: '/album', // ruta estrixta de administrador
            album_one:'/album_one',
            album_portada: '/album_portada',
            album_all:'/album_all',
            buscador: '/buscador',
            addVideo_album: '/addVideo_album',
            videos_all: '/videos_all', // ruta estrixta de administrador
            delte_video_album_data: '/delte_video_album_data',
            lista_reproduccion: '/lista_reproduccion',  // ruta estrixta de administrador
            videos_of_lista: '/videos_of_lista',
            video_lista: '/video_lista',
            video_lista_one: '/video_lista_one',
            video_lista: '/video_lista',
            del_video_list: '/del_video_list',

            delete_user: '/delete_user',
            contacto: '/contacto',
            contacto1: '/contacto1',

            portada_user:'/portada_user'
        }

        if (ruta_usuario[r]) {
            return true
        } else {
            return false
        }
    }
}
module.exports = function (req, res, next) {
    var ruta = req.path
    console.log(req.method,' < > ',ruta, " <<<<<<<<<<<<<<<<<<<<<<<<")
    if (req.headers.authorization) {
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'nodeauthsecret', function (error, decoded) {
            if (error) return res.status(403).json({ msg: "no esta autorizado", error })

            return usuario
                .findOne({
                    where: { id: decoded.id },
                    include: [
                        {
                            model: role,
                            as: 'role'
                        }]
                })
                .then(user_data => {
                    if (!user_data) {
                        res.status(400).json({
                            success: false,
                            msg: "Ese usario no existe o a sido eliminado"
                        })
                    } else {
                        var admin
                        for (var i = 0; i < user_data.role.length; i++) {
                            admin = user_data.role[i].nombre
                        }
                        if (admin == 'administrador') {
                            if (permission(ruta, 'administrador') == true) {
                                next();
                            } else {
                                res.status(400).json({ message: "No tienes Permisos", success: false })
                            }
                        } else
                            if (admin == 'usuraio') {
                                if (permission(ruta, 'usuraio') == true) {
                                    next();
                                } else {
                                    res.status(400).json({ message: "No tienes Permisos", success: false })
                                }
                            }
                    }

                })
        })
    } else {
        if (ruta == '/login' || ruta == '/user_length' || ruta == '/role' || ruta == '/register' || ruta == '/user_role') {

            if (ruta == '/role') {
                if (req.method == 'GET') {
                    res.status(400).json({ message: "No tienes Permisos", success: false })
                } else if (req.method == 'POST') {
                    next();
                }
            } else if (ruta == '/user_role') {
                if (req.method == 'GET') {
                    res.status(400).json({ message: "No tienes Permisos", success: false })
                } else if (req.method == 'POST') {
                    next();
                }
            } else {
                next();
            }

        } else {
            res.status(400).json({
                msg: " No tiene permisos",
                success: false
            })
        }
    }

}

