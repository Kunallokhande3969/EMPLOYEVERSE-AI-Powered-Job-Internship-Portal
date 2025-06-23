const { catchAsyncErorrs } = require("../middlewares/catchAsyncErorrs");
const Student = require("../models/studentModel");
const { v4: uuidv4 } = require("uuid");
const pdf = require("pdf-parse");
const { analyzeResumeWithGemini } = require("../utiles/geminiService");
const ErorrHandler = require("../utiles/ErorrHandler");

// ======================== RESUME MAIN ==============================
exports.resume = catchAsyncErorrs(async (req, res, next) => {
  const { resume } = await Student.findById(req.id).exec();
  res.json({ message: "resume", resume });
});

// ======================== EDUCATION ==============================
exports.addeducation = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.education.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Education added" });
});

exports.editeducation = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const eduIndex = student.resume.education.findIndex(
    (i) => i.id === req.params.eduid
  );
  if (eduIndex === -1)
    return res.status(404).json({ message: "Education not found" });
  student.resume.education[eduIndex] = {
    ...student.resume.education[eduIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Education Edit Successfully" });
});

exports.deleteeducation = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.education = student.resume.education.filter(
    (i) => i.id !== req.params.eduid
  );
  await student.save();
  res.json({ message: "Education Deleted" });
});

// ======================== JOBS ==============================
exports.addjob = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.jobs.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "JOB added" });
});

exports.editjob = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const jobIndex = student.resume.jobs.findIndex(
    (i) => i.id === req.params.jobid
  );
  if (jobIndex === -1)
    return res.status(404).json({ message: "Job not found" });
  student.resume.jobs[jobIndex] = {
    ...student.resume.jobs[jobIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Job Edit Successfully" });
});

exports.deletejob = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.jobs = student.resume.jobs.filter(
    (i) => i.id !== req.params.jobid
  );
  await student.save();
  res.json({ message: "JOB Deleted" });
});

// ============================= INTERNSHIP =====================
exports.addintern = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.internship.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Internship added" });
});

exports.editintern = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const internIndex = student.resume.internship.findIndex(
    (i) => i.id === req.params.internid
  );
  if (internIndex === -1)
    return res.status(404).json({ message: "Internship not found" });
  student.resume.internship[internIndex] = {
    ...student.resume.internship[internIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Internship Edit Successfully" });
});

exports.deleteintern = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.internship = student.resume.internship.filter(
    (i) => i.id !== req.params.internid
  );
  await student.save();
  res.json({ message: "INTERNSHIP Deleted" });
});

// ============================ RESPONSIBILITIES ===========================
exports.addresp = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.responsibilities.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Responsibility added" });
});

exports.editresp = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const respIndex = student.resume.responsibilities.findIndex(
    (i) => i.id === req.params.respid
  );
  if (respIndex === -1)
    return res.status(404).json({ message: "Responsibility not found" });
  student.resume.responsibilities[respIndex] = {
    ...student.resume.responsibilities[respIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Responsibility Edit Successfully" });
});

exports.deleteresp = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.responsibilities = student.resume.responsibilities.filter(
    (i) => i.id !== req.params.respid
  );
  await student.save();
  res.json({ message: "Responsibility Deleted" });
});

// ================================ COURSES ====================
exports.addcourse = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.courses.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Course added" });
});

exports.editcourse = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const courseIndex = student.resume.courses.findIndex(
    (i) => i.id === req.params.courseid
  );
  if (courseIndex === -1)
    return res.status(404).json({ message: "Course not found" });
  student.resume.courses[courseIndex] = {
    ...student.resume.courses[courseIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Course Edit Successfully" });
});

exports.deletecourse = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.courses = student.resume.courses.filter(
    (i) => i.id !== req.params.courseid
  );
  await student.save();
  res.json({ message: "Course Deleted" });
});

// ========================== PROJECT =======================
exports.addproj = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  if (!student.resume.project) student.resume.project = [];
  student.resume.project.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Project added" });
});

exports.editproj = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const projIndex = student.resume.project.findIndex(
    (i) => i.id === req.params.projid
  );
  if (projIndex === -1)
    return res.status(404).json({ message: "Project not found" });
  student.resume.project[projIndex] = {
    ...student.resume.project[projIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Project Edit Successfully" });
});

exports.deleteproj = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.project = student.resume.project.filter(
    (i) => i.id !== req.params.projid
  );
  await student.save();
  res.json({ message: "Project Deleted" });
});

// ============================== SKILLS ========================
exports.addskill = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.skills.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Skill added" });
});

exports.editskill = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const skillIndex = student.resume.skills.findIndex(
    (i) => i.id === req.params.skillid
  );
  if (skillIndex === -1)
    return res.status(404).json({ message: "Skill not found" });
  student.resume.skills[skillIndex] = {
    ...student.resume.skills[skillIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Skill Edit Successfully" });
});

exports.deleteskill = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.skills = student.resume.skills.filter(
    (i) => i.id !== req.params.skillid
  );
  await student.save();
  res.json({ message: "Skill Deleted" });
});

// ========================== ACCOMPLISHMENTS ==================
exports.addacmp = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Accomplishment added" });
});

exports.editacmp = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const acmpIndex = student.resume.accomplishments.findIndex(
    (i) => i.id === req.params.acmpid
  );
  if (acmpIndex === -1)
    return res.status(404).json({ message: "Accomplishment not found" });
  student.resume.accomplishments[acmpIndex] = {
    ...student.resume.accomplishments[acmpIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Accomplishment Edit Successfully" });
});

exports.deleteacmp = catchAsyncErorrs(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.accomplishments = student.resume.accomplishments.filter(
    (i) => i.id !== req.params.acmpid
  );
  await student.save();
  res.json({ message: "Accomplishment Deleted" });
});

// ============================== RESUME ANALYSIS ========================
// ...existing code...

exports.uploadAndAnalyze = async (req, res, next) => {
  console.log("req.file:", req.file);
  console.log("req.body:", req.body);

  try {
    if (!req.body.jobDescription?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job description required",
      });
    }

    const { text: resumeText } = await pdf(req.file.buffer);

    if (!resumeText?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid PDF content",
      });
    }

    const analysis = await analyzeResumeWithGemini(
      resumeText,
      req.body.jobDescription
    );

    console.log("AI Analysis Response:", analysis);

    res.json({ success: true, analysis });
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({
      success: false,
      message: "Analysis failed",
    });
  }
};
