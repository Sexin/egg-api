module.exports = (app) => {
    const { INTEGER, STRING, DATE, TEXT } = app.Sequelize;
    
    const User = app.model.define('users', {
        username: STRING(20),
        password: STRING(128),
        phone: STRING(20),
        fullname: STRING(20),
        created_at: DATE,
        updated_at: DATE
    })

    User.sync({alert: true, add: true})

    return User;
}