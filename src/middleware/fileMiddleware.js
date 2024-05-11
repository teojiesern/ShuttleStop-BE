const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // provide subfolder in consumer
        // One of [seller, customer, product]
        cb(null, 'uploads/' + req.body.subfolder + '/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

const uploadSingle = upload.single('file');

module.exports = { uploadSingle };