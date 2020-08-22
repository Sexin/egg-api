module.exports = (app) => {
    const { INTEGER, STRING, DATE, TEXT } = app.Sequelize;
    
    const Test = app.model.define('tests', {
        name: STRING(20),
        desc: TEXT,
        fullname: STRING(20),
        created_at: DATE,
        updated_at: DATE
    })

    Test.sync({alert: true, add: true})

    return Test;
}