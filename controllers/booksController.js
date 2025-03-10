// importo i dati
// const menu = require('../data/pizzas');

// Importiamo il file di connessione al database
const connection = require('../data/db');


// gruppo delle funzione della logica relativa alle rotte delle pizze

function index(req, res) {

    // // creiamo la query da lanciare
    // const sql = 'SELECT * FROM pizzas';

    // // eseguiamo la query!
    // connection.query(sql, (err, results) => {
    //     if (err) return res.status(500).json({ error: 'Database query failed' });
    //     res.json(results);
    //     console.log(results);

    // });
}

function show(req, res) {

}

function store(req, res) {

}

function update(req, res) {

}

function modify(req, res) {

};

function destroy(req, res) {

}

// esportiamo tutto
module.exports = { index, show, store, update, modify, destroy }