const express = require("express")

router = express.Router()

const service = require("../services/users.service")

var otp = 0


// http://localhost:3000/mhealth-api/users

// Get all Users
router.get('/', async (req, res) => {
    const users = await service.getAllUsers() 
    res.send(users) 
}) 

// Get User by id
router.get('/:id', async (req, res) => {
    const user = await service.getUserById(req.params.id)
    if (user.length == 0){
        res.status(404).json("No User with given id : " + req.params.id)
    }
    else
        res.send(user)
}) 

// Login
router.get('/login/:email', async (req, res) => {
    email = req.params.email;
    const response = await service.logIn(email)
    userPassword = response[0][0]
    console.log(response)
    console.log(userPassword)
    if (response[0].length == 0){
        res.status(404).json("No User with given email : " + email)
    }
    else
        res.status(200).send({userPassword})
}) 

// Add User
router.post('/register', async (req, res) => {
    const result = await service.addUser(req.body)
    // res.status(200).send("User successfully added")
    res.send(result)
}) 


// Delete all completed users 
router.delete('/', async (req, res) => {
    await service.deleteCompletedusers()
    res.status(200).send("users successfully deleted")
}) 

// Delete User by Id
// router.delete('/:id', async (req, res) => {
//     await service.deleteUser(req.params.id)
//     res.status(200).send("User successfully deleted")
// })

// Send email OTP
router.post('/send-otp', async(req, res) => {
    var code = await service.sendOtp(req.body)
    .catch(e => {res.status(500).send({ message: 'Failed to send OTP' },)})
    otp = code
    res.status(200).send({sentotp: `${code}`, message: 'OTP sent successfully'},);
    // console.log(code);
});

// Verify OTP
router.post('/verify-otp', async(req, res) => {
    const response = await service.verifyOtp(otp, req.body)
    res.status(200).send({verified: `${response}`})
})

module.exports = router;
