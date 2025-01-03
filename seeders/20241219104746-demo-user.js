"use strict";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const { hashPassword } = await import("../utils/hashPassword.js");
      console.log("hashPassword have been imported")
      await queryInterface.bulkInsert(
        "users",
        [
          {
            fullname: "John Doe",
            email: "john.doe@example.com",
            password: await hashPassword("hashed_password_1"),
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            fullname: "Jane Smith",
            email: "jane.smith@example.com",
            password: await hashPassword("hashed_password_2"),
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
      console.log("Demo-user Seeders executed successfully.");
    } catch (error) {
      console.error("Error executing seeders:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
