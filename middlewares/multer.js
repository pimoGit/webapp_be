const multer = require("multer");

// File upload middleware
const storage = multer.diskStorage({
    destination: "./public/img/books/",
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
const upload = multer({ storage });

module.exports = upload;