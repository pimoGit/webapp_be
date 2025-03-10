// importo i dati
// const menu = require('../data/pizzas');

// Importiamo il file di connessione al database
const connection = require('../data/db');


// gruppo delle funzione della logica relativa alle rotte delle pizze

function index(req, res) {

    // query di richiesta libri
    const booksSql = "SELECT * FROM books;";

    connection.query(booksSql, (err, result) => {
        // se la query non va a buon fine
        if (err) return res.status(500).json({ error: 'Database query failed' });
        // se tutto funziona
        res.json(result);
    });

}

function show(req, res) {

    // recuperiamo l'id dai params
    const { id } = req.params;

    // prepariamo la query di richiesta
    const detailBook = "SELECT * FROM books WHERE books.id = ?";


    // prepariamo la query di richiesta
    const reviewSql = "SELECT * FROM reviews WHERE book_id = ?";

    // richiediamo i dati del singolo libro
    connection.query(detailBook, [id], (err, bookResult) => {
        // se la query non va a buon fine
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (bookResult.length === 0) return res.status(404).json({ error: 'Book not found' });

        // se tutto funziona
        // res.json(bookResult[0]);
        const book = bookResult[0];

        connection.query(reviewSql, [id], (err, reviewResult) => {
            // se la query non va a buon fine
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // aggiorniamo l'oggetto book con le review ritornate
            book.reviews = reviewResult;

            // ritorniamo l'oggetto completo
            res.json(book);
        });



    });




}

function store(req, res) {

}



// esportiamo tutto
module.exports = { index, show, store }