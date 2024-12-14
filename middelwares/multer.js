const multer = require('multer')
const { consumers } = require('nodemailer/lib/xoauth2')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    }
})


const upload = multer({ storage: storage })

module.exports = upload