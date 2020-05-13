'use strict';
module.exports = (sequelize, DataTypes) => {
  const dataVideo = sequelize.define('dataVideo', {
    genero: DataTypes.STRING,
    audio: DataTypes.STRING,
    calidad: DataTypes.STRING,
    director: DataTypes.STRING,
    video_path: DataTypes.STRING,
    videoID : {
      type: DataTypes.INTEGER,
      references: {
        model: 'videos',
        key: 'id',
        as: 'videoID',
      }
    }
  }, {});
  dataVideo.associate = function(models) {
    // associations can be defined here
    dataVideo.belongsTo(models.videos, {
      foreignKey: 'videoID',
      onDelete: 'CASCADE'
    });
  };
  return dataVideo;
};