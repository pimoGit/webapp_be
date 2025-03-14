const express = require('express');
const router = express.Router();

// importiamo il middelware della gestione file
const upload = require('../middlewares/multer');

// importiamo il controller
const bookController = require("../controllers/booksController");

// ROTTE
// index
router.get('/', bookController.index);
// show
router.get('/:id', bookController.show);
// store review
router.post('/:id/reviews', bookController.storeReview);
// store book
router.post('/', upload.single('image'), bookController.store);








// esportiamo il modulo
module.exports = router;
