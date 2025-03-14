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

        // versione mappata del risultato
        const books = result.map(book => {
            return {
                ...book,
                image: req.imagePath + book.image
            }
        })

        // se tutto funziona
        res.json(books);
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

            // aggiungiamo il valore path img da middleware
            book.image = req.imagePath + book.image;

            // ritorniamo l'oggetto completo
            res.json(book);
        });



    });




}

// inserimento nuovo libro
function store(req, res, next) {

    const { title, author, abstract } = req.body;

    // gestiamo il valore del nome file creato dal middleware
    const imageName = `${req.file.filename}`;

    // creiamo la query di insert
    const query = "INSERT INTO books (title, author, image, abstract) VALUES (?, ?, ?, ?)";

    connection.query(query,
        [title, author, imageName, abstract],
        (err, result) => {
            if (err) {
                console.log(err)
                return next(new Error("Errore interno del server"));
            }

            res.status(201).json({
                status: "success",
                message: "Libro creato con successo!",
            });
        })

}

// inserimento nuoa review
function storeReview(req, res) {

    // id preso dai parametri
    const { id } = req.params;

    // le altre info dal body
    const { text, name, vote } = req.body;

    const insertReviewSql = 'INSERT INTO reviews (text, name, vote, book_id) VALUES (?, ?, ?, ?)'

    // Eseguiamo la query
    connection.query(insertReviewSql, [text, name, vote, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(201);
        res.json({ message: 'Review added', id: results.insertId });
    });

}





// esportiamo tutto
module.exports = { index, show, store, storeReview }