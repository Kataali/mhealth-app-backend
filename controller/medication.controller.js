const express = require("express");

router = express.Router();

const service = require("../services/medication.service");

// Add medication
router.post('/add', async (req, res) => {
    try {
        const result = await service.addMedication(req.body)
        res.send(result)
    } catch (error) {
        res.status(400).send(error);
    }
    // res.status(200).send("User successfully added") 
}) 

// Get all Medications
router.get('/all/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        const medications = await service.getAllMedications(userId);
        console.log(medications[0]);
        res.send(medications[0]);
    } catch (error) {
        console.log("Error getting meds", e)
    } 
}) 



module.exports = router;