'use strict';
module.exports = (sequelize, DataTypes) => {
  const contacto = sequelize.define('contacto', {
    nombres: DataTypes.TEXT,
    apellidos: DataTypes.TEXT,
    telefono: DataTypes.NUMBER,
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuario',
        key: 'id',
        as: 'id_user',
      }
    }
  }, {});
  contacto.associate = function(models) {
    // associations can be defined here
    contacto.belongsTo(models.usuario, {
      foreignKey: 'id_user',
      onDelete: 'CASCADE'
    });
  };
  return contacto;
};