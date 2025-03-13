const express = require('express');
const router = express.Router();

// importiamo il controller
const bookController = require("../controllers/booksController");

// ROTTE
// index
router.get('/', bookController.index);
// show
router.get('/:id', bookController.show);
// store review
router.post('/:id/reviews', bookController.storeReview);





// esportiamo il modulo
module.exports = router;
