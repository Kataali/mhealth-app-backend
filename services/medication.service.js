const db = require('../db')

// Add medication
module.exports.addMedication = async(obj) => {
    const response = await db.query("INSERT INTO medications(id, name, user_id, morning_id, afternoon_id, evening_id) VALUES (?, ?, ?, ?, ?, ?)", [obj.medId, obj.name, obj.id, obj.morningId, obj.afternoonId, obj.eveningId])
        .catch(error => {
            console.log(error)
            throw error;
        })
        // console.log(response)
            return response;
}

// Get All medications for a particular user
 module.exports.getAllMedications = async(userId) => {
    const data = await db.query("SELECT * FROM medications where user_id = ?", [userId])
        .catch(e => console.log(e))
        return data;
}