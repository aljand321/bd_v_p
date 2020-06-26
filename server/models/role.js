'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    nombre: DataTypes.STRING
  }, {});
  role.associate = function(models) {
    // associations can be defined here
    role.belongsToMany(models.usuario,{
      through: 'user_role',
      as: 'usuario',
      foreignKey: 'id_role'
    })
  };
  return role;
};