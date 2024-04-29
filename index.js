const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config.js'); // Import file konfigurasi database
const app = express();
const port = 3001;
const response = require('./request.js'); // Import modul respons kustom

// Middleware untuk parsing body dalam format JSON
app.use(bodyParser.json());

// Endpoint untuk mendapatkan semua data buku
app.get('/books', (req, res) => {
    db.query('SELECT * FROM books', (error, result) => {
        if (error) {
            // Menangani kesalahan jika terjadi pada query
            console.error(error);
            response(500, null, "Internal Server Error", res);
        } else {
            // Mengirimkan hasil query sebagai respons
            res.send(result);
        }
    });
});

// Endpoint untuk mendapatkan semua data kategori buku
app.get('/categories', (req, res) => {
    db.query('SELECT * FROM categories', (error, result) => {
        if (error) {
            // Menangani kesalahan jika terjadi pada query
            console.error(error);
            response(500, null, "Internal Server Error", res);
        } else {
            // Mengirimkan hasil query sebagai respons
            res.send(result);
        }
    });
});

// Endpoint untuk mendapatkan semua data penulis
app.get('/authors', (req, res) => {
    db.query('SELECT * FROM authors', (error, result) => {
        if (error) {
            // Menangani kesalahan jika terjadi pada query
            console.error(error);
            response(500, null, "Internal Server Error", res);
        } else {
            // Mengirimkan hasil query sebagai respons
            res.send(result);
        }
    });
});

// Endpoint untuk mendapatkan semua data pengguna
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (error, result) => {
        if (error) {
            // Menangani kesalahan jika terjadi pada query
            console.error(error);
            response(500, null, "Internal Server Error", res);
        } else {
            // Mengirimkan hasil query sebagai respons
            res.send(result);
        }
    });
});

// Endpoint untuk menambahkan data pengguna baru
app.post('/users', (req, res) => {
    const { username, email } = req.body;
    const sql = `INSERT INTO users (username, email) VALUES ('${username}', '${email}')`;

    db.query(sql, (error, result) => {
        if (error) {
            // Menangani kesalahan jika terjadi pada query
            console.error(error);
            response(500, null, "Internal Server Error", res);
        } else {
            // Menangani respons jika data berhasil ditambahkan
            const data = {
                isSuccess: result.affectedRows > 0, // Menggunakan result untuk mengecek jumlah baris yang terpengaruh
                user_id: result.insertId
            };
            response(200, data, "Data berhasil disimpan", res);
        }
    });
});

// Memulai server pada port yang ditentukan
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
