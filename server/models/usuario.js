'use strict';
const bcrypt = require('bcrypt-nodejs');
module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define('usuario', {
    user: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  
  usuario.beforeSave((user, options) => {
    if(user.changed('password')){
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
    }
  })

  usuario.prototype.comparePassword = function (passw, cb){
    bcrypt.compare(passw, this.password, function(err, isMatch){
      if (err){
        return cb(err);
      }
      cb(null, isMatch)
    })
  }

  usuario.associate = function(models) {
    // associations can be defined here
    usuario.hasMany(models.contacto, {
      foreignKey: 'id_user',
    });
  };

  return usuario;
};