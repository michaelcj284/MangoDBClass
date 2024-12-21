const fs = require('fs');

// middleware to clear single upload files when response is sent

const clearSingleFiles = (req, res, next) => {
    res.on("finish", () => {
        if (res.statusCode === 201 || res.statusCode === 200) {
                fs.unlinkSync(req.file.path);
        }
    });
    next();
};

//middleware to clear multiple upload fikes when response is sent
const clearMultipleFiles = (req, res, next) => {
    res.on("finish", () => {
        if(res.statusCode === 201 || res.statusCode === 200) {
            fs.unlinkSync(req.file.path);
        }
    })
    next();
}

module.exports = {clearSingleFiles, clearMultipleFiles}