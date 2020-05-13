'use strict';
module.exports = (sequelize, DataTypes) => {
  const portadas = sequelize.define('portadas', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    imagePath: DataTypes.STRING
  }, {});
  portadas.associate = function(models) {
    // associations can be defined here
    portadas.hasMany(models.albun, {
      foreignKey: 'idPortada',
    });
  };
  return portadas;
};