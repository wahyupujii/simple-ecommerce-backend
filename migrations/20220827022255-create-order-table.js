'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('orders', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
      },
      user_id: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      payment_method: {
          type: Sequelize.STRING,
          allowNull: false
      },
      proof_payment: {
          type: Sequelize.STRING,
          allowNull: false
      },
      ammount: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      verification: {
          type: Sequelize.STRING,
          allowNull: false
      },
      created_at: {
          type: Sequelize.DATE,
          allowNull: false
      },
      updated_at: {
          type: Sequelize.DATE,
          allowNull: false
      }
   });
   
   await queryInterface.addConstraint('orders', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'user id foreign key',
      references: {
          table: 'users',
          field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
   })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('orders');
  }
};
