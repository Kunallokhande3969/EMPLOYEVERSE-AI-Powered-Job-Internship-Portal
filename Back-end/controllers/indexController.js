const { catchAsyncErorrs } = require("../middlewares/catchAsyncErorrs");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const Student = require("../models/studentModel");
const ErorrHandler = require("../utiles/ErorrHandler");
const { sendtoken } = require("../utiles/SendTokens");
const { sendmail } = require("../utiles/nodemailer");
const imagekit = require("../utiles/imageKit");
const path = require("path");

exports.homepage = catchAsyncErorrs(async (req, res, next) => {
  res.json({
    message: "Secure Homepage !",
  });
});

exports.current = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id)
    .populate("jobs")
    .populate("internships")
    .exec();
  res.json(student);
});

exports.deletestudent = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findByIdAndDelete(req.id).exec();
  res.json({ success: true, student, message: "Deleted user " });
});

exports.studentsignup = catchAsyncErorrs(async (req, res, next) => {
  const student = await new Student(req.body).save();
  sendtoken(student, 200, res);
});

exports.studentsignin = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email })
    .select("+password")
    .exec();
  if (!student) {
    return next(
      new ErorrHandler("User not found with this email address !", 404)
    );
  }

  const isMatch = student.comparepassword(req.body.password);

  if (!isMatch) {
    return next(new ErorrHandler("Wrong Password", 500));
  }
  sendtoken(student, 201, res);
});

exports.studentsignout = catchAsyncErorrs(async (req, res, next) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  };

  if (process.env.COOKIE_DOMAIN)
    cookieOptions.domain = process.env.COOKIE_DOMAIN;

  // Clear the cookie with the same options used when setting it so the browser removes it
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ message: "successfully signout" });
});

exports.studentsendmail = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).exec();

  if (!student) {
    return next(
      new ErorrHandler("User not found with this email address !", 404)
    );
  }

  const url = Math.floor(Math.random() * 9000 + 1000);
  sendmail(req, res, next, url);
  student.resetPasswordToken = `${url}`;
  await student.save();
  res.json({ student, url });
});

exports.studentforgetlink = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).exec();
  if (!student) {
    return next(
      new ErorrHandler("User not found with this email address !", 404)
    );
  }
  if (student.resetPasswordToken == req.body.otp) {
    student.resetPasswordToken = "0";
    student.password = req.body.password;
    await student.save();
  } else {
    return next(
      new ErorrHandler("Invalid Password Link please try again!", 500)
    );
  }
  res.status(200).json({
    message: "Password has been successfully changed",
  });
});

exports.studentresetpassword = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.password = req.body.password;
  await student.save();
  sendtoken(student, 201, res);
});

exports.studentupdate = catchAsyncErorrs(async (req, res, next) => {
  await Student.findByIdAndUpdate(req.params.id, req.body).exec();
  res.status(200).json({
    success: true,
    message: "Student details have been updated",
  });
});

exports.studentavatar = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.params.id).exec();

  const file = req.files.avatar;
  const modifiedName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

  if (student.avatar.fileId !== "") {
    await imagekit.deleteFile(student.avatar.fileId);
  }

  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedName,
  });
  student.avatar = { fileId, url };
  await student.save();
  res.json({
    success: true,
    message: "Avatar successfully uploaded",
  });
});

//=================Apply Internships===================
exports.applyinternship = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const internship = await Internship.findById(req.params.internshipid).exec();
  student.internships.push(internship._id);
  internship.students.push(student._id);
  await student.save();
  await internship.save();
  res.json({ student, internship });
});

//================Apply Jobs===========================

exports.applyjob = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const job = await Job.findById(req.params.jobid).exec();
  student.jobs.push(job._id);
  job.students.push(student._id);
  await student.save();
  await job.save();
  res.json({ student, job });
});

// ================job read alll
exports.studentreadalljobs = catchAsyncErorrs(async (req, res, next) => {
  const job = await Job.find().exec();
  res.status(200).json({ job });
});

// =================internship all ===================
exports.studentreadallinternships = catchAsyncErorrs(async (req, res, next) => {
  const internship = await Internship.find().exec();
  res.json({ internship });
});

exports.readsinglejob = catchAsyncErorrs(async (req, res, next) => {
  const job = await Job.findById(req.params.id).exec();
  res.status(200).json({ success: true, job });
});

exports.readsingleinternship = catchAsyncErorrs(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id).exec();
  res.status(200).json({ success: true, internship });
});
