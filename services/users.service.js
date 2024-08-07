const db = require('../db')
const crypto = require("crypto");
const nodemailer = require("nodemailer");




 module.exports.getAllUsers = async() => {
    const data = await db.query("SELECT * FROM users")
        .catch(e => console.log(e))
        return data;
}

module.exports.getDailyTips= async() => {
    const [data] = await db.query("SELECT * FROM tips")
        .catch(e => console.log(e))
        return data;
}
module.exports.getUserById = async(id) => {
    const [data] = await db.query("SELECT * FROM users WHERE id = ?",[id])
        .catch(error => {
            console.log(error)
            throw error;
        })
        return data;
}

module.exports.addUser = async(obj) => {
    const id = parseInt((Date.now() * Math.random()).toString().substring(0,8));
    const response = await db.query("INSERT INTO users(id, name, email, password) VALUES (?, ?, ?, ?)", [id, obj.name.trim(), obj.email.trim(), obj.password.trim()])
        .catch(error => {
            console.log(error)
            throw error;
        })
        // console.log(response)
            return response;
}

module.exports.deleteUser = async(id) => {
    const response = await db.query("DELETE FROM users WHERE id = ?", [id])
        .catch(error => {
            console.log(error)
            throw error;
        })
        return response;
}

module.exports.logIn = async(email) => {
    const response = await db.query("SELECT * FROM users WHERE email = ?", [email])
        .catch(error => {
            console.log(error)
            throw error;
        })
        return response;
}

module.exports.changePassword = async (obj, email) => {
   const response = await db.query("UPDATE users SET password = ? WHERE email = ?", [obj.password, email])
    .catch(error => {
            console.log(error)
            throw error;
        })
    return response

}

module.exports.sendOtp = async(obj) => {
    email = obj.email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "muhammadismaaiil360@gmail.com",
            pass: "yikl mmak mmmb zfde"
        }
      });
      
    const otpCode = Math.floor(1000 + Math.random() * 9000);
    const mailOptions = {
        from: "muhammadismaaiil360@gmail.com",
        to: email,
        subject: " AI MHEALTH APP",
        text: `Your OTP code is ${otpCode}.`,
    };

    const response = await transporter.sendMail(mailOptions)
    .catch(error => {
            console.log(error)
            throw error;
        })
        return otpCode;
}

module.exports.verifyOtp = async(otp, obj) =>{
    const code = parseInt(obj.code)
    try {
        if(code === otp){
        return true;
    }
    } catch (error) {
        throw error;
    }
    return false; 
}

