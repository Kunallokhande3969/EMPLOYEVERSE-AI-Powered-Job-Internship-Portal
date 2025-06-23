const {catchAsyncErorrs} = require("../middlewares/catchAsyncErorrs")
const Employe = require("../models/employeeModel");
const Internship = require("../models/internshipModel")
const Job = require("../models/jobModel")
const ErorrHandler = require("../utiles/ErorrHandler");
const { sendtoken } = require("../utiles/SendTokens");
const { sendmail } = require("../utiles/nodemailer");
const imagekit = require("../utiles/imageKit");
const path = require("path")

exports.homepage = catchAsyncErorrs(async(req,res,next)=>{
    res.json({
        message :"Secure Employe Homepage !"
    })

});


exports.currentEmploye = catchAsyncErorrs(async(req,res,next)=>{
    const employe = await Employe.findById(req.id).populate("jobs").populate("internships").exec();
    res.json(employe);

});

exports.deleteemploye = catchAsyncErorrs(async(req,res,next)=>{
    const employe = await Employe.findOneAndDelete(req.id).exec();
    res.json({success: true , employe , message : "Employe Deleted"});

});



exports.employesignup = catchAsyncErorrs(async(req,res,next)=>{ 
    const employe = await new Employe(req.body).save();
    sendtoken(employe , 200, res)

});

exports.employesignin = catchAsyncErorrs(async(req,res,next)=>{

    const employe = await Employe.findOne({email : req.body.email})
    .select("+password")
    .exec()
    if(!employe){

        return next(
            new ErorrHandler("User not found with this email address !", 404)
        )
    }

    const isMatch = employe.comparepassword(req.body.password);

    if(!isMatch){

        return next(new ErorrHandler("Wrong Password"), 500);

    }
    sendtoken(employe , 201, res)
   

});



exports.employesignout = catchAsyncErorrs(async(req,res,next)=>{
   
    res.clearCookie("token");
    res.json({message : "succefully signout"})

});


exports.employesendmail = catchAsyncErorrs(async(req,res,next)=>{

    const employe = await Employe.findOne({email : req.body.email}).exec();

    if(!employe){

        return next(
            new ErorrHandler("User not found with this email address !", 404)
        )
    }

    // const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${employe._id}`

    
    const url = Math.floor(Math.random() * 9000 + 1000);
    sendmail(req, res, next , url)
    employe.resetPasswordToken = `${url}`;
    await employe.save();
    res.json({employe ,url})

});


exports.employeforgetlink = catchAsyncErorrs(async(req,res,next)=>{
   
    const employe = await Employe.findOne({email : req.body.email}).exec();
    if(!employe){
        return next(
            new ErorrHandler("User not found with this email address !", 404)
        )
    }
    if(employe.resetPasswordToken == req.body.otp){
        employe.resetPasswordToken = "0";
        employe.password = req.body.password;
        await employe.save();
    }
    else{
        return next(
            new ErorrHandler("Invalid Password Link please try again!", 500)
        )
    }

    res.status(200).json({
        message: "Password has been successfully changed"
    })
});

exports.employeresetpassword = catchAsyncErorrs(async(req,res,next)=>{
   
    const employe = await Employe.findById(req.id).exec();
    employe.password = req.body.password;
    await employe.save();
    sendtoken(employe , 201, res)
});

exports.employeupdate = catchAsyncErorrs(async(req,res,next)=>{
     await Employe.findByIdAndUpdate(req.params.id , req.body).exec()
    res.status(200).json({

        success : true,
        message : "employe details have been updated",
    })

});

exports.employeavatar = catchAsyncErorrs(async (req, res, next) => {
  console.log("=== employeavatar controller hit ==="); // Yeh line sabse upar
  console.log("req.file:", req.file);                  // Yeh line uske niche

  const employe = await Employe.findById(req.params.id).exec();
  const file = req.file; // Multer se file aise milti hai
  if (!file) {
    return next(new ErorrHandler("No file uploaded", 400));
  }
  const modifiedName = `resumebuilder-${Date.now()}${path.extname(file.originalname)}`;

  if (employe.organizationLogo && employe.organizationLogo.fileId) {
    await imagekit.deleteFile(employe.organizationLogo.fileId);
  }

  const { fileId, url } = await imagekit.upload({
    file: file.buffer,
    fileName: modifiedName,
  });
  employe.organizationLogo = { fileId, url };
  await employe.save();
  res.json({
    success: true,
    message: "OrganizationLogo successfully uploaded",
    url,
  });
});

//===================================INTERNSHIP=====================

exports.createinternship = catchAsyncErorrs(async(req,res,next)=>{ 
    const employe = await Employe.findById(req.id).exec();
    const internship = await new Internship(req.body)
    internship.employe = employe._id;
    employe.internships.push(internship._id);
    await internship.save();
    await employe.save();
    res.status(201).json({success : true, internship})

});

   
exports.readinternship = catchAsyncErorrs(async(req,res,next)=>{ 
    const {internships} = await Employe.findById(req.id).populate("internships").exec();
    res.status(200).json({success : true, internships,})

});


exports.readsingleinternship= catchAsyncErorrs(async(req,res,next)=>{ 
    const internship = await Internship.findById(req.params.id).exec()
    res.status(200).json({success : true, internship})

});


//===================================JOB=====================

exports.createjob = catchAsyncErorrs(async(req,res,next)=>{ 
    const employe = await Employe.findById(req.id).exec();
    const job = await new Job(req.body)
    job.employe = employe._id;
    employe.jobs.push(job._id);
    await job.save();
    await employe.save();
    res.status(201).json({success : true, job})

});

   
exports.readjob = catchAsyncErorrs(async(req,res,next)=>{ 
    const {jobs} = await Employe.findById(req.id).populate("jobs").exec();
    res.status(200).json({success : true, jobs,})

});


exports.readsinglejob= catchAsyncErorrs(async(req,res,next)=>{ 
    const job = await Job.findById(req.params.id).exec()
    res.status(200).json({success : true, job})

});

exports.closejob = catchAsyncErorrs(async (req, res, next) => {

    const job = await Job.findById(req.params.id).exec();
    if (!job) return next(new ErorrHandler("Job not found", 404));
    job.status = "Closed";
    await job.save();
    res.status(200).json({success:true,message:"Job closed successfully"});  

});
