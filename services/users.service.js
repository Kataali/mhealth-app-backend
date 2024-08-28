const db = require('../db')
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
// const saltRounds = Math.floor(Math.random() * 20);

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
module.exports.getUserByEmail = async (obj) => {
    const email = obj.email;
    const [data] = await db.query("SELECT * FROM users WHERE email = ?",[email])
        .catch(error => {
            console.log(error)
            throw error;
        })
        return data;
}

module.exports.addUser = async(obj) => {
    const id = parseInt((Date.now() * Math.random()).toString().substring(0, 8));
    const password = obj.password;
    const email = obj.email.trim();
    const name = obj.name.trim();
    const saltRounds = Math.floor(Math.random() * 20);
    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
        if(err){
            throw "Error Hashing Password";
        }
        console.log(saltRounds);
        const response = await db.query('INSERT INTO users(id, name, email, password) VALUES (?, ?, ?, ?)', [id, name, email, hashedPassword])
            .catch(e => {
                console.log(e);
                // throw "database query error"
            });
        return response;
    })
}

module.exports.deleteUser = async(id) => {
    const response = await db.query("DELETE FROM users WHERE id = ?", [id])
        .catch(error => {
            console.log(error)
            throw error;
        })
        return response;
}

module.exports.logIn = async (email, password) => {
    const response = await db.query("SELECT * FROM users WHERE email = ?", [email])
        .catch(e => { console.log(e); throw "database query error" });
    // console.log(response[0].length)
    if (response[0].length > 0) {
            const hashedPassword = response[0][0].password;
            if(bcrypt.compareSync(password, hashedPassword)){
                return response[0];
            }
            else
                return {"message":"login failed"};
        }else
        return {"message":"no account exists for this email"};
}

module.exports.changePassword = async (obj, email) => {
    const password = obj.password.trim();
    const saltRounds = Math.floor(Math.random() * 20);
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const [result] = await db.query("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email]);
        return result.affectedRows;
    } catch (err) {
        console.error(err);
        throw "An error occurred";
    }
};

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
        subject: "AI MHEALTH APP",
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

