const express = require("express");

router = express.Router();

const service = require("../services/model.service");

router.get("/predict", async (req, res) => {
    response = await service.predictDisease();
    res.send(response);
})




module.exports = router;