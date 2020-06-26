'use strict';
module.exports = (sequelize, DataTypes) => {
  const lista_reproduccion = sequelize.define('lista_reproduccion', {
    title: DataTypes.STRING,
    data: DataTypes.BOOLEAN,
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuario',
        key: 'id',
        as: 'id_user',
      }
    }
  }, {});
  lista_reproduccion.associate = function(models) {
    // associations can be defined here
    lista_reproduccion.hasMany(models.videos_of_lista, {
      foreignKey: 'id_lista',
    });
    lista_reproduccion.belongsTo(models.usuario, {
      foreignKey: 'id_user',
      onDelete: 'CASCADE'
    });
  };
  return lista_reproduccion;
};