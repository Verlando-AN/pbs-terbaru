const express = require('express');
const app = express();
const port = 3002;
const bodyParser = require('body-parser');
const db = require('./config.js'); // Menggunakan file konfigurasi database yang Anda berikan sebelumnya
const response = require('./response.js');

// Middleware untuk parsing body dalam format JSON
app.use(bodyParser.json());

// Endpoint untuk memberi pesan selamat datang
app.get("/books", (req, res) => {
  response(200, "welcome to api", "Selamat datang di api service", res);
});

// Endpoint untuk mendapatkan semua data buku
app.get("/", (req, res) => {
  const sql = "SELECT * FROM books";
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      response(500, null, "Internal Server Error", res);
    } else {
      response(200, result, "get all data books", res);
    }
  });
});

// Endpoint untuk mendapatkan data buku berdasarkan ID
app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const sql = `SELECT * FROM books WHERE id = ${bookId}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      response(500, null, "Internal Server Error", res);
    } else if (result.length === 0) {
      response(404, null, "Book not found", res);
    } else {
      response(200, result[0], "get book by id", res);
    }
  });
});

// Endpoint untuk menambahkan data buku baru
app.post("/books", (req, res) => {
  const { title, author, category, user } = req.body;
  const sql = `INSERT INTO books (title, author, category, user) VALUES ('${title}', '${author}', '${category}', '${user}')`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      response(500, null, "Internal Server Error", res);
    } else {
      const data = {
        isSuccess: result.affectedRows > 0,
        book_id: result.insertId
      };
      response(200, data, "Book successfully added", res);
    }
  });
});

// Endpoint untuk menghapus data buku berdasarkan ID
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const sql = `DELETE FROM books WHERE id = ${bookId}`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      response(500, null, "Internal Server Error", res);
    } else if (result.affectedRows === 0) {
      response(404, null, "Book not found", res);
    } else {
      const data = {
        isSuccess: true
      };
      response(200, data, "Book successfully deleted", res);
    }
  });
});

// Endpoint untuk mengubah data buku berdasarkan ID
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const { title, author, category, user } = req.body;
  const sql = `UPDATE books SET title='${title}', author='${author}', category='${category}', user='${user}' WHERE id=${bookId}`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      response(500, null, "Internal Server Error", res);
    } else if (result.affectedRows === 0) {
      response(404, null, "Book not found", res);
    } else {
      const data = {
        isSuccess: true
      };
      response(200, data, "Book successfully updated", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Running in port ${port}`);
});
