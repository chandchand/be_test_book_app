// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowingControllers');

/**
 * @swagger
 * tags:
 *   name: Borrow
 *   description: Endpoints untuk peminjaman dan pengembalian buku.
 */

/**
 * @swagger
 * /api/borrow:
 *   post:
 *     summary: Melakukan peminjaman buku.
 *     tags: [Borrow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               member_id:
 *                 type: string
 *               book_id:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               member_id: "651409aeb38a6e959bf9825e"
 *               book_id: ["6513fff981323cc95ebe55b1", "6514000081323cc95ebe55b3"]
 *     responses:
 *       200:
 *         description: Peminjaman buku berhasil.
 *       400:
 *         description: Permintaan tidak valid.
 *       404:
 *         description: Member atau buku tidak ditemukan.
 */

/**
 * @swagger
 * /api/return:
 *   post:
 *     summary: Melakukan pengembalian buku.
 *     tags: [Borrow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               borrow_id:
 *                 type: string
 *               book_id:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               borrow_id: "65145bfb8186e21ccb761bdb"
 *               book_id: ["6513fff981323cc95ebe55b1", "6514000081323cc95ebe55b3"]
 *     responses:
 *       200:
 *         description: Pengembalian buku berhasil.
 *       400:
 *         description: Permintaan tidak valid.
 *       404:
 *         description: Peminjaman buku tidak ditemukan.
 */

/**
 * @swagger
 * /api/borrow/{id}:
 *   delete:
 *     summary: Menghapus data peminjaman buku berdasarkan ID.
 *     tags: [Borrow]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID peminjaman buku yang akan dihapus.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data peminjaman buku berhasil dihapus.
 *       404:
 *         description: Data peminjaman buku tidak ditemukan.
 */


router.route('/borrow')
    .post(borrowController.borrowCreate)
router.route('/return')
    .post(borrowController.createReturn)
router.route('/borrow/:id').delete(borrowController.delete)

module.exports = router;
