'use strict';

const fakerID_ID = require("@faker-js/faker").faker;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    let productArray = [];
    for (let i = 0; i < 10; i++) {
      let obj = {
        name: fakerID_ID.commerce.productName(),
        price: fakerID_ID.commerce.price({ min: 1000000, max: 5000000, dec: 0 }),
        image: fakerID_ID.image.urlLoremFlickr({ category: "phone" }),
        description: fakerID_ID.commerce.productDescription(),
        quantity: 20,
        created_at: fakerID_ID.date.past(),
        updated_at: fakerID_ID.date.recent(),
      }
      productArray.push(obj)
    }

    await queryInterface.bulkInsert('products', [...productArray])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('products', null, {})
  }
};
