const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // provide subfolder in consumer
        // One of [seller, customer, product]
        cb(null, 'imageDB/' + req.body.subfolder + '/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

const deleteFile = (filePath) => {
    fs.unlink(path.join(__dirname, '../..', filePath), (err) => {
        if (err) {
            console.error(err);
        }
    });
};

const uploadSingle = upload.single('file');
const uploadFields = (fields) => upload.fields(fields);

module.exports = { uploadSingle, uploadFields, deleteFile };
