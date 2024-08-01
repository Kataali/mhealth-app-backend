const express = require("express");

router = express.Router();

const service = require("../services/model.service");

router.get("/predict", async (req, res) => {
    // const data = req.body.data;
    // console.log(data);
    response = await service.predictDisease();
    res.send(response);
})




module.exports = router;