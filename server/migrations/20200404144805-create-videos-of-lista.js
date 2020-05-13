'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('videos_of_lista', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      album: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      artista: {
        type: Sequelize.STRING
      },
      año: {
        type: Sequelize.STRING
      },
      genero: {
        type: Sequelize.STRING
      },
      videoPath: {
        type: Sequelize.STRING
      },
      id_video: {
        type: Sequelize.INTEGER
      },
      id_lista: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'lista_reproduccions',
          key: 'id',
          as: 'id_lista',
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
    return queryInterface.dropTable('videos_of_lista');
  }
};