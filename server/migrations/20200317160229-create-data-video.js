'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('dataVideos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      genero: {
        type: Sequelize.STRING
      },
      audio: {
        type: Sequelize.STRING
      },
      calidad: {
        type: Sequelize.STRING
      },
      director: {
        type: Sequelize.STRING
      },
      video_path: {
        type: Sequelize.STRING
      },
      videoID:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'videos',
          key: 'id',
          as: 'videoID',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('dataVideos');
  }
};