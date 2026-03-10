const { rental } = require("../models/index.js");
module.exports = (app) => {
  const rental = require("../controllers/rental.controller.js");

  var router = require("express").Router();

  /**
   * @swagger
   * components:
   *   schemas:
   *     Rental:
   *       type: object
   *       required:
   *         - id_client
   *         - id_tariff
   *         - start_datetime
   *         - planned_end_datetime
   *         - status
   *       properties:
   *         id_rental:
   *           type: integer
   *           description: Auto-incremented ID
   *           example: 1
   *         id_client:
   *           type: integer
   *           example: 1
   *         id_tariff:
   *           type: integer
   *           example: 1
   *         start_datetime:
   *           type: string
   *           format: date-time
   *           example: "2025-01-01T10:00:00Z"
   *         planned_end_datetime:
   *           type: string
   *           format: date-time
   *           example: "2025-01-01T12:00:00Z"
   *         actual_end_datetime:
   *           type: string
   *           format: date-time
   *           example: "2025-01-01T11:30:00Z"
   *         total_amount:
   *           type: number
   *           example: 200.00
   *         status:
   *           type: string
   *           example: "Активна"
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   */

  /**
   * @swagger
   * /api/rental:
   *   post:
   *     summary: Create a new rental
   *     tags: [Rental]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Rental'
   *     responses:
   *       201:
   *         description: Rental created
   *       400:
   *         description: Bad request
   */
  router.post("/", rental.create);

  /**
   * @swagger
   * /api/rental:
   *   get:
   *     summary: Get all rentals
   *     tags: [Rental]
   *     parameters:
   *       - in: query
   *         name: status
   *         schema:
   *           type: string
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
  router.get("/", rental.findAll);

  /**
   * @swagger
   * /api/rental/{id}:
   *   get:
   *     summary: Get rental by ID
   *     tags: [Rental]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Rental found
   *       404:
   *         description: Rental not found
   */
  router.get("/:id", rental.findOne);

  /**
   * @swagger
   * /api/rental/{id}:
   *   put:
   *     summary: Update rental
   *     tags: [Rental]
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
   *             $ref: '#/components/schemas/Rental'
   *     responses:
   *       200:
   *         description: Rental updated
   *       404:
   *         description: Rental not found
   */
  router.put("/:id", rental.update);

  /**
   * @swagger
   * /api/rental/{id}:
   *   delete:
   *     summary: Delete rental
   *     tags: [Rental]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Rental deleted
   *       404:
   *         description: Rental not found
   */
  router.delete("/:id", rental.delete);

  /**
   * @swagger
   * /api/rental:
   *   delete:
   *     summary: Delete all rentals
   *     tags: [Rental]
   *     responses:
   *       200:
   *         description: All rentals deleted
   */
  router.delete("/", rental.deleteAll);

  /**
   * @swagger
   * /api/rental/{id}/clientfullname:
   *   get:
   *     summary: Get client full name by rental ID
   *     tags: [Rental]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Client full name
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 full_name:
   *                   type: string
   */
  router.get("/:id/clientfullname", rental.getClientFullName);

  /**
   * @swagger
   * /api/rental/{id}/tariff:
   *   get:
   *     summary: Get tariff by rental ID
   *     tags: [Rental]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Tariff found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Tariff'
   */
  router.get("/:id/tariff", rental.getTariff);

  /**
   * @swagger
   * /api/rental/{id}/totalcost:
   *   get:
   *     summary: Get total cost by rental ID
   *     tags: [Rental]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Total cost
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 total_cost:
   *                   type: number
   */
  router.get("/:id/totalcost", rental.getTotalCost);

  app.use("/api/rental", router);
  console.log("Router for /api/rental initialized");
};
