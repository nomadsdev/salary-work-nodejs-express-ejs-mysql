const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_add_delete'
});

db.connect((err) => {
    if (err) {
        console.error('Error connection to database');
    } else {
        console.log('Connected to database');
    }
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    db.query('SELECT * FROM jobs', (err, results) => {
        if (err) throw err;
        res.render('index', { jobs: results });
    });
});

app.post('/add', (req, res) => {
    const { name, salary } = req.body;
    const INSERT_QUERY = `INSERT INTO jobs (name, salary) VALUES (?, ?)`;
    db.query(INSERT_QUERY, [name, salary], (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    const DELETE_QUERY = `DELETE FROM jobs WHERE id = ?`;
    db.query(DELETE_QUERY, [id], (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log('Server is running');
});