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
    // console.log(obj);
    const response = await db.query("INSERT INTO users(name, email, password) VALUES (?, ?, ?)", [obj.name, obj.email, obj.password])
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

module.exports.logIn = async(email) => {
    const response = await db.query("SELECT password FROM users WHERE email = ?", [email])
        .catch(e => console.log(e))
        return response;
}