'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('documents', [
      {
        name: 'Document Test',
        content: '# This is a test',
        userId: 1,
        workspaceId: 1,
      },
      {
        name: 'Document Test',
        content: '# This is a test owo',
        userId: 1,
        workspaceId: 1,
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('documents', null, {})
  }
};
