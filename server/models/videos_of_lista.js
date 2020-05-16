'use strict';
module.exports = (sequelize, DataTypes) => {
  const videos_of_lista = sequelize.define('videos_of_lista', {
    album: DataTypes.STRING,
    nombre: DataTypes.STRING,
    artista: DataTypes.STRING,
    año: DataTypes.STRING,
    genero: DataTypes.STRING,
    portada: DataTypes.STRING,
    video_data: DataTypes.STRING,
    id_video : DataTypes.INTEGER,
    id_lista: {
      type: DataTypes.INTEGER,
      references: {
        model: 'lista_reproduccion',
        key: 'id',
        as: 'id_lista',
      }
    }
  }, {});
  videos_of_lista.associate = function(models) {
    // associations can be defined here
    videos_of_lista.belongsTo(models.lista_reproduccion, {
      foreignKey: 'id_lista',
      onDelete: 'CASCADE'
    });
  };
  return videos_of_lista;
};