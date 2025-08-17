const mongoose = require("mongoose")
const internshipModel = new mongoose.Schema({
       
    students :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "student"
        }],
    employe :
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "employe"
        },
    profile : String,
    skills : String,
    internshiptype : {type : String , enum:["In office","Remote"]},
    openings : Number,
    from : String,
    to : String,
    duration : String,
    responsibility : String,
    stipend : {
        status :{
            type : String,
            enum : ["Fixed" , "Negotiable" , "Performace Based" , "Unpaid"]
        },
    },
    salary : Number,
    perks : String,
    assesments : String,

},{timestamps : true})

const Internship = mongoose.model("internship", internshipModel);
module.exports = Internship;