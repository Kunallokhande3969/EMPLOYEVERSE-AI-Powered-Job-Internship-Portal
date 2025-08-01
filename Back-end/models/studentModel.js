const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const studentModel = new mongoose.Schema({

        firstname : {
            type : String,
            required : [true , "First Name is Required!"],
           minLength : [4 , "First name must be 4 character"]
        },
        lastname : {
            type : String,
            required : [true , "Last Name is Required!"],
           minLength : [4 , "Last name must be 4 character"]
        },
        contact :{
            type : String,
            required : [true , "Contact is Required!"],
           maxLength : [10 , "Contact must not exceed 10 character"],
           minLength : [10 , "Contact must be 10 character"]
        },
        city : {
            type : String,
            required : [true , "City Name is Required!"],
            minLength : [3 , "CIty Should be  atleast 3 character long"]
        },
        gender : {
            type : String,
            enum : ["Male" , "Female" , "Others"]
        },
        email :{
            type : String,
            unique : true,
            required : [true , "Email is reuired!"],
            match : [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
                "Email address is invalid"
            ]
        },
        password : {

            type: String,
            select : false,
            maxLength : [15 , "Password should not exceed more than 15 character "],
            minLength :[6 , "Password should have atleast 6 character"],
            // match :[(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/), "Password is not valid"]
            

        },
        resetPasswordToken : {
            type: String,
            default : "0"
        },
        avatar : {
            type : Object,
            default : {
                fileId : '',
                url : "https://images.unsplash.com/photo-1695504237592-df3322573ee4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
            }
        },
        resume : {
            education : [],
            jobs : [],
            internship : [],
            responsibilities : [], 
            courses :[],
            project : [],
            skills : [],
            accomplishments : [],
        },
        internships : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "internship"
            }
        ],
        jobs :[
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "job"
            }
        ],
        

},{timestamps : true})

studentModel.pre("save" , function(){
    if(!this.isModified("password")){

        return;

    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password , salt);


})


studentModel.methods.comparepassword = function(password){

    return bcrypt.compareSync(password, this.password);

}

studentModel.methods.getJwtToken = function(){
    return jwt.sign({id : this._id} , process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRE
    })
}

const Student = mongoose.model("student", studentModel);

module.exports = Student;

//