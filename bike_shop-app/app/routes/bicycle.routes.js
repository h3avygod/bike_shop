const { bicycle } = require("../models/index.js");
module.exports = app => {
    const bicycle = require("../controllers/bicycle.controller.js");
    
    var router = require("express").Router();

    /**
     * @swagger
     * components:
     *   schemas:
     *     Bicycle:
     *       type: object
     *       required:
     *         - model
     *         - manufacturer
     *         - frame_number
     *         - id_category
     *         - status
     *       properties:
     *         id_bicycle:
     *           type: integer
     *           description: Auto-incremented ID
     *           example: 1
     *         model:
     *           type: string
     *           example: "Trek Marlin 5"
     *         manufacturer:
     *           type: string
     *           example: "Trek"
     *         frame_number:
     *           type: string
     *           example: "FR123456"
     *         id_category:
     *           type: integer
     *           example: 1
     *         frame_size:
     *           type: string
     *           example: "M"
     *         brake_type:
     *           type: string
     *           example: "Дисковые"
     *         gear_count:
     *           type: integer
     *           example: 21
     *         year:
     *           type: integer
     *           example: 2023
     *         status:
     *           type: string
     *           example: "Доступен"
     *         createdAt:
     *           type: string
     *           format: date-time
     *         updatedAt:
     *           type: string
     *           format: date-time
     */

    /**
     * @swagger
     * /api/bicycle:
     *   post:
     *     summary: Create a new bicycle
     *     tags: [Bicycle]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Bicycle'
     *     responses:
     *       201:
     *         description: Bicycle created
     *       400:
     *         description: Bad request
     */
    router.post("/", bicycle.create);

    /**
     * @swagger
     * /api/bicycle:
     *   get:
     *     summary: Get all bicycles
     *     tags: [Bicycle]
     *     parameters:
     *       - in: query
     *         name: model
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: List of bicycles
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Bicycle'
     */
    router.get("/", bicycle.findAll);

    /**
     * @swagger
     * /api/bicycle/{id}:
     *   get:
     *     summary: Get bicycle by ID
     *     tags: [Bicycle]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Bicycle found
     *       404:
     *         description: Bicycle not found
     */
    router.get("/:id", bicycle.findOne);

    /**
     * @swagger
     * /api/bicycle/{id}:
     *   put:
     *     summary: Update bicycle
     *     tags: [Bicycle]
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
     *             $ref: '#/components/schemas/Bicycle'
     *     responses:
     *       200:
     *         description: Bicycle updated
     *       404:
     *         description: Bicycle not found
     */
    router.put("/:id", bicycle.update);

    /**
     * @swagger
     * /api/bicycle/{id}:
     *   delete:
     *     summary: Delete bicycle
     *     tags: [Bicycle]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Bicycle deleted
     *       404:
     *         description: Bicycle not found
     */
    router.delete("/:id", bicycle.delete);

    /**
     * @swagger
     * /api/bicycle:
     *   delete:
     *     summary: Delete all bicycles
     *     tags: [Bicycle]
     *     responses:
     *       200:
     *         description: All bicycles deleted
     */
    router.delete("/", bicycle.deleteAll);

    /**
     * @swagger
     * /api/bicycle/{id}/categoryname:
     *   get:
     *     summary: Get category name by bicycle ID
     *     tags: [Bicycle]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Category name
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 name:
     *                   type: string
     */
    router.get("/:id/categoryname", bicycle.getCategoryName);

    app.use("/api/bicycle", router);
    console.log('Router for /api/bicycle initialized');
};
