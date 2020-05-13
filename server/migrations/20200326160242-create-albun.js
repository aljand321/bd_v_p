'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('albuns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      album: {
        type: Sequelize.STRING
      },
      nombre:{
        type: Sequelize.STRING
      },
      artista: {
        type: Sequelize.STRING
      },
      anio: {
        type: Sequelize.STRING
      },
      genero: {
        type: Sequelize.STRING
      },
      videoPath: {
        type: Sequelize.STRING
      },
      idPortada: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'portadas',
          key: 'id',
          as: 'idPortada'
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
    return queryInterface.dropTable('albuns');
  }
};