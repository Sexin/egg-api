const { v4: uuv4 } = require('uuid')

exports.createUUID = () => {
    return uuv4();
}