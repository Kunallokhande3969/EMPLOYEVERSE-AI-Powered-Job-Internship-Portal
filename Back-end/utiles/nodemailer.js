const nodemailer = require("nodemailer");
const ErorrHandler = require("./ErorrHandler");

exports.sendmail = (req, res , next, url)=>{
    const transport = nodemailer.createTransport({
            service :"gmail",
            host : "smtp.gmail.com",
            post : 465,
            auth :{
                user :process.env.MAIL_EMAIL_ADDRESS,
                pass :process.env.MAIL_EMAIL_PASSWORD,
            }
    })
    const mailOptions = {
        from : "Kunal Lokhande Pvt. Ltd <kunallokhande3969@gmail.com>",
        to : req.body.email,
        subject : "Password reset link ",
        "text" : "Do not share this link to anyone",
        html: `<h1>click on the link to reset your password</h1> 
        <a href="${url}">click here</a>
        opt is ${url}
        `,
    }
    transport.sendMail(mailOptions, (err, info)=>{
        if(err) return next(
            new ErorrHandler(err, 500)
        )
        console.log(info)
        return res.status(200).json({
            message : "Mail sent succesfully",
            url,
        })
    })
}
