'use strict';
module.exports = (sequelize, DataTypes) => {
  const albun = sequelize.define('albun', {
    album: DataTypes.STRING,
    nombre: DataTypes.STRING,
    artista: DataTypes.STRING,
    anio: DataTypes.STRING,
    genero: DataTypes.STRING,
    videoPath: DataTypes.STRING,
    idPortada:{
      type: DataTypes.INTEGER,
      references: {
        model: 'portadas',
        key: 'id',
        as: 'idPortada',
      }
    }
  }, {});
  albun.associate = function(models) {
    // associations can be defined here
    albun.hasMany(models.video_album, {
      foreignKey: 'id_album',
    });
    albun.belongsTo(models.portadas, {
      foreignKey: 'idPortada',
      onDelete: 'CASCADE'
    });
  };
  return albun;
};