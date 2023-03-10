'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('users', [
      {
        name: "widada",
        profession: "Admin Micro",
        role: "admin",
        email: "juarakoding@gmail.com",
        password: await bcrypt.hash('rahasia1234', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Yein",
        profession: "Front End Developer",
        role: "student",
        email: "yein@mail.com",
        password: await bcrypt.hash('rahasiaku123', 10),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
