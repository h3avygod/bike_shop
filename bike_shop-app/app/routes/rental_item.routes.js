const { rentalItem } = require("../models/index.js");
module.exports = app => {
    const rentalItem = require("../controllers/rental_item.controller.js");
    
    var router = require("express").Router();

    /**
     * @swagger
     * components:
     *   schemas:
     *     RentalItem:
     *       type: object
     *       required:
     *         - id_rental
     *         - id_bicycle
     *       properties:
     *         id_rental:
     *           type: integer
     *           example: 1
     *         id_bicycle:
     *           type: integer
     *           example: 1
     *         hours_used:
     *           type: integer
     *           example: 2
     *         item_cost:
     *           type: number
     *           example: 200.00
     *         createdAt:
     *           type: string
     *           format: date-time
     *         updatedAt:
     *           type: string
     *           format: date-time
     */

    /**
     * @swagger
     * /api/rentalItem:
     *   post:
     *     summary: Create a new rental item
     *     tags: [RentalItem]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RentalItem'
     *     responses:
     *       201:
     *         description: Rental item created
     *       400:
     *         description: Bad request
     */
    router.post("/", rentalItem.create);

    /**
     * @swagger
     * /api/rentalItem:
     *   get:
     *     summary: Get all rental items
     *     tags: [RentalItem]
     *     parameters:
     *       - in: query
     *         name: rentalId
     *         schema:
     *           type: integer
     *       - in: query
     *         name: bicycleId
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: List of rental items
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/RentalItem'
     */
    router.get("/", rentalItem.findAll);

    /**
     * @swagger
     * /api/rentalItem/{rentalId}/{bicycleId}:
     *   get:
     *     summary: Get rental item by rental ID and bicycle ID
     *     tags: [RentalItem]
     *     parameters:
     *       - in: path
     *         name: rentalId
     *         required: true
     *         schema:
     *           type: integer
     *       - in: path
     *         name: bicycleId
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Rental item found
     *       404:
     *         description: Rental item not found
     */
    router.get("/:rentalId/:bicycleId", rentalItem.findOne);

    /**
     * @swagger
     * /api/rentalItem/{rentalId}/{bicycleId}:
     *   put:
     *     summary: Update rental item
     *     tags: [RentalItem]
     *     parameters:
     *       - in: path
     *         name: rentalId
     *         required: true
     *         schema:
     *           type: integer
     *       - in: path
     *         name: bicycleId
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RentalItem'
     *     responses:
     *       200:
     *         description: Rental item updated
     *       404:
     *         description: Rental item not found
     */
    router.put("/:rentalId/:bicycleId", rentalItem.update);

    /**
     * @swagger
     * /api/rentalItem/{rentalId}/{bicycleId}:
     *   delete:
     *     summary: Delete rental item
     *     tags: [RentalItem]
     *     parameters:
     *       - in: path
     *         name: rentalId
     *         required: true
     *         schema:
     *           type: integer
     *       - in: path
     *         name: bicycleId
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Rental item deleted
     *       404:
     *         description: Rental item not found
     */
    router.delete("/:rentalId/:bicycleId", rentalItem.delete);

    /**
     * @swagger
     * /api/rentalItem:
     *   delete:
     *     summary: Delete all rental items
     *     tags: [RentalItem]
     *     responses:
     *       200:
     *         description: All rental items deleted
     */
    router.delete("/", rentalItem.deleteAll);

    app.use("/api/rentalItem", router);
    console.log('Router for /api/rentalItem initialized');
};
