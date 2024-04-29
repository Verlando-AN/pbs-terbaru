const response = (statusCode, data, message, res) => {
    // Mengatur status HTTP dalam respons sesuai dengan parameter yang diberikan.
    res.status(statusCode).json({
        // Bagian payload berisi status code dan data.
        payload: {
            status_code: statusCode, // Menyimpan status code
            data: data, // Menyimpan data
        },
        // Menyertakan pesan yang akan dikirimkan bersama dengan respons.
        message: message,
        // Informasi tambahan terkait pagination, pada kasus ini kosong.
        pagination: {
            prev: '', // Link untuk halaman sebelumnya
            next: '', // Link untuk halaman selanjutnya
            max: '' // Jumlah maksimal data (bisa digunakan untuk pagination)
        }
    });
}

// Ekspor fungsi response agar dapat digunakan di seluruh aplikasi.
module.exports = response;
