const { category } = require("../models/index.js");
module.exports = app => {
    const category = require("../controllers/category.controller.js");
    
    var router = require("express").Router();

    /**
     * @swagger
     * components:
     *   schemas:
     *     Category:
     *       type: object
     *       required:
     *         - name
     *       properties:
     *         id_category:
     *           type: integer
     *           description: Auto-incremented ID
     *           example: 1
     *         name:
     *           type: string
     *           description: Category name
     *           example: "Горные велосипеды"
     *         description:
     *           type: string
     *           description: Category description
     *           example: "Велосипеды для бездорожья"
     *         createdAt:
     *           type: string
     *           format: date-time
     *         updatedAt:
     *           type: string
     *           format: date-time
     */

    /**
     * @swagger
     * /api/category:
     *   post:
     *     summary: Create a new category
     *     tags: [Category]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *             properties:
     *               name:
     *                 type: string
     *                 example: "Горные велосипеды"
     *               description:
     *                 type: string
     *                 example: "Велосипеды для бездорожья"
     *     responses:
     *       201:
     *         description: Category created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Category'
     *       400:
     *         description: Bad request
     */
    router.post("/", category.create);

    /**
     * @swagger
     * /api/category:
     *   get:
     *     summary: Get all categories
     *     tags: [Category]
     *     parameters:
     *       - in: query
     *         name: name
     *         schema:
     *           type: string
     *         description: Filter by category name (partial match)
     *     responses:
     *       200:
     *         description: List of categories
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Category'
     */
    router.get("/", category.findAll);

    /**
     * @swagger
     * /api/category/{id}:
     *   get:
     *     summary: Get category by ID
     *     tags: [Category]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Category found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Category'
     *       404:
     *         description: Category not found
     */
    router.get("/:id", category.findOne);

    /**
     * @swagger
     * /api/category/{id}:
     *   put:
     *     summary: Update category
     *     tags: [Category]
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
     *             $ref: '#/components/schemas/Category'
     *     responses:
     *       200:
     *         description: Category updated
     *       404:
     *         description: Category not found
     */
    router.put("/:id", category.update);

    /**
     * @swagger
     * /api/category/{id}:
     *   delete:
     *     summary: Delete category
     *     tags: [Category]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Category deleted
     *       404:
     *         description: Category not found
     */
    router.delete("/:id", category.delete);

    /**
     * @swagger
     * /api/category:
     *   delete:
     *     summary: Delete all categories
     *     tags: [Category]
     *     responses:
     *       200:
     *         description: All categories deleted
     */
    router.delete("/", category.deleteAll);

    /**
     * @swagger
     * /api/category/{id}/tariffs:
     *   get:
     *     summary: Get all tariffs for a category by ID
     *     tags: [Category]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
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
    router.get("/:id/tariffs", category.getCategoryTariffs);

    app.use("/api/category", router);
    console.log('Router for /api/category initialized');
};
