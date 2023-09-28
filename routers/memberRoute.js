// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

/**
 * @swagger
 * tags:
 *   name: Member
 *   description: Endpoints untuk mengelola anggota.
 */

/**
 * @swagger
 * /api/member:
 *   get:
 *     summary: Mendapatkan daftar semua anggota.
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: Sukses mendapatkan daftar anggota.
 */

/**
 * @swagger
 * /api/member:
 *   post:
 *     summary: Membuat anggota baru.
 *     tags: [Member]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *             example:
 *               code: "M001"
 *               name: "Nama Anggota Baru"
 *     responses:
 *       201:
 *         description: Anggota berhasil dibuat.
 *       400:
 *         description: Permintaan tidak valid.
 */

/**
 * @swagger
 * /api/member/{id}:
 *   get:
 *     summary: Mendapatkan detail anggota berdasarkan ID.
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID anggota yang akan diambil.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sukses mendapatkan detail anggota.
 *       404:
 *         description: Anggota tidak ditemukan.
 */

/**
 * @swagger
 * /api/member/{id}:
 *   put:
 *     summary: Memperbarui informasi anggota berdasarkan ID.
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID anggota yang akan diperbarui.
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
 *               name:
 *                 type: string
 *             example:
 *               code: "M001"
 *               name: "Nama Anggota Terbaru"
 *     responses:
 *       200:
 *         description: Anggota berhasil diperbarui.
 *       400:
 *         description: Permintaan tidak valid.
 *       404:
 *         description: Anggota tidak ditemukan.
 */

/**
 * @swagger
 * /api/member/{id}:
 *   delete:
 *     summary: Menghapus anggota berdasarkan ID.
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID anggota yang akan dihapus.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Anggota berhasil dihapus.
 *       404:
 *         description: Anggota tidak ditemukan.
 */

router.route('/member')
    .post(memberController.create)
    .get(memberController.getAllMember)
router.route('/member/:id')
    .get(memberController.getMemberById)
    .put(memberController.update)
    .delete(memberController.delete)

module.exports = router;
