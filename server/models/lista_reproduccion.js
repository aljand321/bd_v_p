'use strict';
module.exports = (sequelize, DataTypes) => {
  const lista_reproduccion = sequelize.define('lista_reproduccion', {
    title: DataTypes.STRING,
    data: DataTypes.BOOLEAN
  }, {});
  lista_reproduccion.associate = function(models) {
    // associations can be defined here
    lista_reproduccion.hasMany(models.videos_of_lista, {
      foreignKey: 'id_lista',
    });
  };
  return lista_reproduccion;
};