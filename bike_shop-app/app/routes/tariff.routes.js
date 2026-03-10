const { tariff } = require("../models/index.js");
module.exports = app => {
    const tariff = require("../controllers/tariff.controller.js");
    
    var router = require("express").Router();

    /**
     * @swagger
     * components:
     *   schemas:
     *     Tariff:
     *       type: object
     *       required:
     *         - name
     *         - id_category
     *         - start_date
     *       properties:
     *         id_tariff:
     *           type: integer
     *           description: Auto-incremented ID
     *           example: 1
     *         id_category:
     *           type: integer
     *           example: 1
     *         name:
     *           type: string
     *           example: "Часовой тариф"
     *         price_per_hour:
     *           type: number
     *           example: 100.00
     *         price_per_day:
     *           type: number
     *           example: 500.00
     *         start_date:
     *           type: string
     *           format: date
     *           example: "2025-01-01"
     *         end_date:
     *           type: string
     *           format: date
     *           example: "2025-12-31"
     *         createdAt:
     *           type: string
     *           format: date-time
     *         updatedAt:
     *           type: string
     *           format: date-time
     */

    /**
     * @swagger
     * /api/tariff:
     *   post:
     *     summary: Create a new tariff
     *     tags: [Tariff]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Tariff'
     *     responses:
     *       201:
     *         description: Tariff created
     *       400:
     *         description: Bad request
     */
    router.post("/", tariff.create);

    /**
     * @swagger
     * /api/tariff:
     *   get:
     *     summary: Get all tariffs
     *     tags: [Tariff]
     *     parameters:
     *       - in: query
     *         name: name
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: List of tariffs
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Tariff'
     */
    router.get("/", tariff.findAll);

    /**
     * @swagger
     * /api/tariff/{id}:
     *   get:
     *     summary: Get tariff by ID
     *     tags: [Tariff]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Tariff found
     *       404:
     *         description: Tariff not found
     */
    router.get("/:id", tariff.findOne);

    /**
     * @swagger
     * /api/tariff/{id}:
     *   put:
     *     summary: Update tariff
     *     tags: [Tariff]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Tariff'
     *     responses:
     *       200:
     *         description: Tariff updated
     *       404:
     *         description: Tariff not found
     */
    router.put("/:id", tariff.update);

    /**
     * @swagger
     * /api/tariff/{id}:
     *   delete:
     *     summary: Delete tariff
     *     tags: [Tariff]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Tariff deleted
     *       404:
     *         description: Tariff not found
     */
    router.delete("/:id", tariff.delete);

    /**
     * @swagger
     * /api/tariff:
     *   delete:
     *     summary: Delete all tariffs
     *     tags: [Tariff]
     *     responses:
     *       200:
     *         description: All tariffs deleted
     */
    router.delete("/", tariff.deleteAll);

    app.use("/api/tariff", router);
    console.log('Router for /api/tariff initialized');
};
