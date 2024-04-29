// Memuat modul MySQL dari paket 'mysql'
const mysql = require('mysql');

// Variabel koneksi database
const db = mysql.createConnection({
  host: 'localhost', // Alamat host database
  user: 'root',      // Nama pengguna database
  password: '',      // Kata sandi untuk pengguna database (kosong dalam kasus ini)
  database: 'perpustakaan' // Nama database yang digunakan (dianggap 'resto')
});

// Membuat koneksi ke database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Ekspor variabel koneksi database agar dapat digunakan di modul lain
module.exports = db;
