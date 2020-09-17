'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('refrigerations', {
        id: {type: INTEGER, primaryKey: true, autoIncrement: true},
        title: STRING(100),
        img_mark_title: STRING(100),
        origin: STRING(100),
        summary: TEXT,
        coverimage: STRING(255),
        link: STRING(255),
        img_mark_link: STRING(255),
        tag_link: STRING(255),
        coverimage: STRING(255),
        time: DATE,
        tag: STRING(100),
        created_at: DATE,
        updated_at: DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('refrigerations');
  }
};