'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_role = sequelize.define('user_role', {
    id_user: DataTypes.INTEGER,
    id_role: DataTypes.INTEGER
  }, {});
  user_role.associate = function(models) {
    // associations can be defined here
  };
  return user_role;
};