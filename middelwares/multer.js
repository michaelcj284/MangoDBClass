const multer = require('multer');
const fs = require("fs");
const { consumers } = require('nodemailer/lib/xoauth2')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    }
})


const upload = multer({ storage: storage })

const clearUploadFiles = (req, res, next) => {
    res.on("finish", () => {
        if (res.statusCode === 201 || res.statusCode === 200) {
                fs.unlinkSync(req.file.path);
        }
    });
    next();
};

module.exports = {upload, clearUploadFiles}