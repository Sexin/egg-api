const fs = require('mz/fs');

exports.getFiles = function(ctx, url) {
    fs.exists(url, (err, exists) => {
        console.log(exists)
        if(exists) {
            readdir(ctx, url);
        } else {
            fs.mkdir(url, (err) => {
                if(err) {
                    ctx.throw(err);
                } else {
                    readdir(ctx, url);
                }
            });
        }
    })   
}

const readdir = function(ctx, url) {
    let arr = [];
    fs.readdir(url, (err, files) => {
        if(err) {
            ctx.throw(err)
        } else {
            arr = files;
        }
    })
    return arr;
}