const express = require("express")

router = express.Router()

const service = require("../services/users.service")


// http://localhost:3000/mhealth-api/users/

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
    const user = await service.logIn(req.params.email)
    if (user.length == 0){
        res.status(404).json("No User with given email : " + req.params.email)
    }
    else
        res.send(user)
}) 

// Add User
router.post('/', async (req, res) => {
    const result = await service.addUser(req.body)
    // res.status(200).send("User successfully added")
    res.send(result)
}) 

// // Update User
// router.put('/:id', async (req, res) => {
//     const result = await service.updateUser(req.body, req.params.id)
//     res.status(200).send(result)
// })

// Delete all completed users 
router.delete('/', async (req, res) => {
    await service.deleteCompletedusers ()
    res.status(200).send("users successfully deleted")
}) 

// Delete User by Id
router.delete('/:id', async (req, res) => {
    await service.deleteUser(req.params.id)
    res.status(200).send("User successfully deleted")
})

module.exports = router;