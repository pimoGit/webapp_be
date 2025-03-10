const express = require('express');
const router = express.Router();

// importiamo il controller
const bookController = require("../controllers/booksController");

// ROTTE
router.get('/', bookController.index);

router.get('/:id', bookController.show);



// esportiamo il modulo
module.exports = router;
