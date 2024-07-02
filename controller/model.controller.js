const express = require("express");

router = express.Router();

const service = require("../services/model.service");

router.get("/predict", async (req, res) => {
    const data = req.body;
    response = await service.predictDisease(data);
    return response;
})




module.exports = router;