'use strict';

const fakerID_ID = require("@faker-js/faker").faker;
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    let userArray = [{
      name: 'Wahyu Puji',
      email: 'wahyu@gmail.com',
      password: await bcrypt.hash('q', 10),
      real_password: "q",
      created_at: fakerID_ID.date.past(),
      updated_at: fakerID_ID.date.recent(),
    }];
    for (let i = 0; i < 10; i++) {
      let obj = {
        name: fakerID_ID.person.fullName(),
        email: fakerID_ID.internet.email().toLowerCase(),
        password: await bcrypt.hash('q', 10),
        real_password: "q",
        created_at: fakerID_ID.date.past(),
        updated_at: fakerID_ID.date.recent(),
      }
      userArray.push(obj)
    }

    await queryInterface.bulkInsert('users', [...userArray])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {})
  }
};
