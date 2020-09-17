module.exports = (app) => {
    const { INTEGER, STRING, DATE, TEXT } = app.Sequelize;
    
    const Refrigeration = app.model.define('refrigerations', {
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

    Refrigeration.sync({alert: true, add: true})

    return Refrigeration;
}
