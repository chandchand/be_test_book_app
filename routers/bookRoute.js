// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Endpoints untuk mengelola buku.
 */

/**
 * @swagger
 * /api/book:
 *   get:
 *     summary: Mendapatkan daftar semua buku.
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Sukses mendapatkan daftar buku.
 */

/**
 * @swagger
 * /api/book:
 *   post:
 *     summary: Membuat buku baru.
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               stock:
 *                 type: number
 *             example:
 *               code: "BK001"
 *               title: "Judul Buku Baru"
 *               author: "Penulis Buku Baru"
 *               stock: 10
 *     responses:
 *       201:
 *         description: Buku berhasil dibuat.
 *       400:
 *         description: Permintaan tidak valid.
 */

/**
 * @swagger
 * /api/book/{id}:
 *   get:
 *     summary: Mendapatkan detail buku berdasarkan ID.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID buku yang akan diambil.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sukses mendapatkan detail buku.
 *       404:
 *         description: Buku tidak ditemukan.
 */

/**
 * @swagger
 * /api/book/{id}:
 *   put:
 *     summary: Memperbarui informasi buku berdasarkan ID.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID buku yang akan diperbarui.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               stock:
 *                 type: number
 *             example:
 *               code: "BK001"
 *               title: "Judul Buku Terbaru"
 *               author: "Penulis Buku Terbaru"
 *               stock: 15
 *     responses:
 *       200:
 *         description: Buku berhasil diperbarui.
 *       400:
 *         description: Permintaan tidak valid.
 *       404:
 *         description: Buku tidak ditemukan.
 */

/**
 * @swagger
 * /api/book/{id}:
 *   delete:
 *     summary: Menghapus buku berdasarkan ID.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID buku yang akan dihapus.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Buku berhasil dihapus.
 *       404:
 *         description: Buku tidak ditemukan.
 */


router.route('/book')
    .post(bookController.create)
    .get(bookController.getAllBook)
router.route('/book/:id')
    .get(bookController.getBookById)
    .put(bookController.update)
    .delete(bookController.delete)

module.exports = router;
