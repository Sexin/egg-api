'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const { INTEGER, DATE, STRING, TEXT } = Sequelize;
        await queryInterface.createTable('users', {
            id: {type: INTEGER, primaryKey: true, autoIncrement: true},
            username: STRING(20),
            password: STRING(128),
            phone: STRING(20),
            fullname: STRING(20),
            created_at: DATE,
            updated_at: DATE
        })
    },
     
    down: async (queryInterface) => {
        await queryInterface.dropTable('users');
    }
};