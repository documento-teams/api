'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Ajouter la colonne parentWorkspace
    await queryInterface.addColumn('workspaces', 'parentWorkspace', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'workspaces',
        key: 'id',
      },
    });
    
    // Renommer la colonne userId en workspaceAuthor
    await queryInterface.renameColumn('workspaces', 'userId', 'workspaceAuthor');
  },

  async down (queryInterface, Sequelize) {
    // Supprimer la colonne parentWorkspace
    await queryInterface.removeColumn('workspaces', 'parentWorkspace');
    
    // Revenir au nom original de la colonne
    await queryInterface.renameColumn('workspaces', 'workspaceAuthor', 'userId');
  }
};