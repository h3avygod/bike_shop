const { client } = require("../models/index.js");
module.exports = app => {
    const client = require("../controllers/client.controller.js");
    
    var router = require("express").Router();

    /**
     * @swagger
     * components:
     *   schemas:
     *     Client:
     *       type: object
     *       required:
     *         - last_name
     *         - first_name
     *         - phone
     *         - registration_date
     *       properties:
     *         id_client:
     *           type: integer
     *           description: Auto-incremented ID
     *           example: 1
     *         last_name:
     *           type: string
     *           example: "Иванов"
     *         first_name:
     *           type: string
     *           example: "Иван"
     *         middle_name:
     *           type: string
     *           example: "Иванович"
     *         phone:
     *           type: string
     *           example: "+7-999-123-45-67"
     *         email:
     *           type: string
     *           example: "ivan@example.com"
     *         registration_date:
     *           type: string
     *           format: date
     *           example: "2025-01-01"
     *         createdAt:
     *           type: string
     *           format: date-time
     *         updatedAt:
     *           type: string
     *           format: date-time
     */

    /**
     * @swagger
     * /api/client:
     *   post:
     *     summary: Create a new client
     *     tags: [Client]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Client'
     *     responses:
     *       201:
     *         description: Client created
     *       400:
     *         description: Bad request
     */
    router.post("/", client.create);

    /**
     * @swagger
     * /api/client:
     *   get:
     *     summary: Get all clients
     *     tags: [Client]
     *     parameters:
     *       - in: query
     *         name: phone
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: List of clients
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Client'
     */
    router.get("/", client.findAll);

    /**
     * @swagger
     * /api/client/{id}:
     *   get:
     *     summary: Get client by ID
     *     tags: [Client]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Client found
     *       404:
     *         description: Client not found
     */
    router.get("/:id", client.findOne);

    /**
     * @swagger
     * /api/client/{id}:
     *   put:
     *     summary: Update client
     *     tags: [Client]
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
     *             $ref: '#/components/schemas/Client'
     *     responses:
     *       200:
     *         description: Client updated
     *       404:
     *         description: Client not found
     */
    router.put("/:id", client.update);

    /**
     * @swagger
     * /api/client/{id}:
     *   delete:
     *     summary: Delete client
     *     tags: [Client]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Client deleted
     *       404:
     *         description: Client not found
     */
    router.delete("/:id", client.delete);

    /**
     * @swagger
     * /api/client:
     *   delete:
     *     summary: Delete all clients
     *     tags: [Client]
     *     responses:
     *       200:
     *         description: All clients deleted
     */
    router.delete("/", client.deleteAll);

    /**
     * @swagger
     * /api/client/{id}/rentals:
     *   get:
     *     summary: Get all rentals for a client by ID
     *     tags: [Client]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: List of rentals
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Rental'
     */
    router.get("/:id/rentals", client.getClientRentals);

    app.use("/api/client", router);
    console.log('Router for /api/client initialized');
};