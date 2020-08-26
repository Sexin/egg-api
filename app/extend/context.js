module.exports = {

    getToken(value) {
        return this.app.jwt.sign(value, this.app.config.jwt.secret);
    },

    checkToken(token) {
        console.log(1)
        console.log(token)
        return this.app.jwt.verify(token, this.app.config.jwt.secret);
    }
}