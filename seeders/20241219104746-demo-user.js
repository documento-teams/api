"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          fullname: "John Doe",
          email: "john.doe@example.com",
          password: "hashed_password_1",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullname: "Jane Smith",
          email: "jane.smith@example.com",
          password: "hashed_password_2",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
