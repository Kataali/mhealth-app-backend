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

// Mark Med as done
router.put('/med-completed/:medId', async(req, res) => {
    medId = req.params.medId
    const response = await service.markDone(req.body, medId)
        .catch(e => {res.status(500).send({ message: 'Failed to mark med as completed' },)})
        res.status(200).send({message: 'Med successfully marked as completed'},);

})

module.exports = router;