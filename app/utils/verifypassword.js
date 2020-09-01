const PASSWORD = Symbol();

class VerifyPassword {
    constructor(username, password) {
        this.username = username;
        this[PASSWORD] = password;
    }

    checkpassword(pwd) {
        return this[PASSWORD] === pwd;
    }
}

module.exports = VerifyPassword;