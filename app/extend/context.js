const crypto = require('crypto');

module.exports = {

    getToken(value) {
        return this.app.jwt.sign(value, this.app.config.jwt.secret);
    },

    checkToken(token) {
        return this.app.jwt.verify(token, this.app.config.jwt.secret);
    },

    // 加密
    getMd5Data(data) {
        return crypto.createHash('md5').update(data).digest('hex');
    }
}