'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('workspaces', 'parentWorkspace', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'workspaces',
        key: 'id',
      },
    });
    
    await queryInterface.renameColumn('workspaces', 'userId', 'workspaceAuthor');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('workspaces', 'parentWorkspace');
    
    await queryInterface.renameColumn('workspaces', 'workspaceAuthor', 'userId');
  }
};