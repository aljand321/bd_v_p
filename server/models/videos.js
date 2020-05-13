'use strict';
module.exports = (sequelize, DataTypes) => {
  const videos = sequelize.define('videos', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    imagePath: DataTypes.STRING
  }, {});
  videos.associate = function(models) {
    // associations can be defined here
    videos.hasMany(models.dataVideo, {
      foreignKey: 'videoID',
    });
  };
  return videos;
};