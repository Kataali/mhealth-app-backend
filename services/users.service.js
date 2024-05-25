const db = require('../db')

 module.exports.getAllUsers = async() => {
    const [data] = await db.query("SELECT * FROM users")
        .catch(e => console.log(e))
        return data;
}

module.exports.getUserById = async(id) => {
    const [data] = await db.query("SELECT * FROM users WHERE id = ?",[id])
        .catch(e => console.log(e))
        return data;
}

module.exports.addUser = async(obj) => {
    const response = await db.query("INSERT INTO users(name, password) VALUES (?, ?)", [obj.name, obj.password])
        .catch(e => console.log(e))
        return response;
}

// module.exports.updateTask = async(obj, id) => {
//     const response = await db.query("UPDATE users SET id = ? WHERE id = ?", [obj.id, id])
//         .catch(e => console.log(e))
//         return response;
// }

module.exports.deleteUser = async(id) => {
    const response = await db.query("DELETE FROM users WHERE id = ?", [id])
        .catch(e => console.log(e))
        return response;
}

// module.exports.deleteCompletedusers = async() => {
//     const response = await db.query("DELETE FROM users WHERE isDone = 1")
//         .catch(e => console.log(e))
//         return response;
// }