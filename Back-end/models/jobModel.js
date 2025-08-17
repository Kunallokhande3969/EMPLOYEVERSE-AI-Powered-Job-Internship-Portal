const mongoose = require("mongoose")
const jobModel = new mongoose.Schema({
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
    status: {
        type: String,
        enum: {
            values: [
                'Open',
                'Closed'
            ],  
        },
        default: 'Open'
    },
    title : String,
    skills : String,
    jobtype : {type : String , enum:["In office","Remote"]},
    openings : Number,
    description : String,
    preference : String,
    salary : Number,
    perks : String,
    assesments : String,
    

},{timestamps : true})

const Job = mongoose.model("job", jobModel);
module.exports = Job;