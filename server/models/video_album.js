'use strict';
module.exports = (sequelize, DataTypes) => {
  const video_album = sequelize.define('video_album', {
    video: DataTypes.STRING,
    id_album: DataTypes.INTEGER
  }, {});
  video_album.associate = function(models) {
    // associations can be defined here
    video_album.belongsTo(models.albun, {
      foreignKey: 'id_album',
      onDelete: 'CASCADE'
    });
  };
  return video_album;
};