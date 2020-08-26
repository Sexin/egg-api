'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
        queryInterface.addColumn(
            "tests",
            "address",
            Sequelize.STRING(20)
        ),
        queryInterface.addIndex(
            'tests',
            {name: "name", unique: false, fields: ['name']}
        )
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};