'use strict';
module.exports = (sequelize, DataTypes) => {
  const video_album = sequelize.define('video_album', {
    video: DataTypes.STRING,
    id_album: {
      type: DataTypes.INTEGER,
      references: {
        model: 'albun',
        key: 'id',
        as: 'id_album',
      }
    }
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