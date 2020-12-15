const crypto = require('crypto');
const salt = 'g3fZFuvz'
exports.getPassword = function (password) {
    const hmac = crypto.createHmac('sha256', password + salt);
    console.log(hmac)
    return hmac.digest('hex');
}