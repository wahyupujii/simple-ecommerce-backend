'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('cart', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            order_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            total_price: {
                type: Sequelize.INTEGER,
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

        await queryInterface.addConstraint('cart', {
            fields: ['order_id'],
            type: 'foreign key',
            name: 'order id foreign key',
            references: {
                table: 'orders',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        })

        await queryInterface.addConstraint('cart', {
            fields: ['product_id'],
            type: 'foreign key',
            name: 'product id foreign key',
            references: {
                table: 'products',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        })


    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */

        await queryInterface.dropTable('cart');
    }
};
