const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");

// Week 3 & Week 5 CRUD Endpoints for /api/foods
router.get("/foods", foodController.getAllFoods);
router.post("/foods", foodController.createFood);
router.put("/foods/:id", foodController.updateFood);
router.delete("/foods/:id", foodController.deleteFood);

// Week 9 Bill Generation Endpoint
router.post("/bills", foodController.createBill);

module.exports = router;
