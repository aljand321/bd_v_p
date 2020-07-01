'use strict';
module.exports = (sequelize, DataTypes) => {
  const portadas = sequelize.define('portadas', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    imagePath: DataTypes.STRING,
    id_user:{
      type: DataTypes.INTEGER,
      references: {
        model: 'usuario',
        key: 'id',
        as: 'id_user',
      }
    }
  }, {});
  portadas.associate = function(models) {
    // associations can be defined here
    portadas.hasMany(models.albun, {
      foreignKey: 'idPortada',
    });
    portadas.belongsTo(models.usuario, {
      foreignKey: 'id_user',
      onDelete: 'CASCADE'
    });
  };
  return portadas;
};