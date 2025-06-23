const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const imagekit = require("../utiles/imageKit");
const {
  resume,
  addeducation,
  editeducation,
  deleteeducation,
  addjob,
  editjob,
  deletejob,
  addintern,
  editintern,
  deleteintern,
  addresp,
  editresp,
  deleteresp,
  addcourse,
  editcourse,
  deletecourse,
  addproj,
  editproj,
  deleteproj,
  addskill,
  editskill,
  deleteskill,
  addacmp,
  editacmp,
  deleteacmp,
  uploadAndAnalyze,
} = require("../controllers/resumeController");

const multer = require("multer");

// Multer configuration
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1,
    parts: 5,
    headerPairs: 20
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and Word documents are allowed'), false);
    }
  }
});



const photoUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG, and GIF images are allowed'), false);
    }
  }
});

// Error handling wrapper for async routes
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ======================== RESUME ROUTES ========================

// Resume main data
router.get("/", isAuthenticated, asyncHandler(resume));

// EDUCATION
router.post("/add-edu", isAuthenticated, asyncHandler(addeducation));
router.post("/edit-edu/:eduid", isAuthenticated, asyncHandler(editeducation));
router.post("/delete-edu/:eduid", isAuthenticated, asyncHandler(deleteeducation));

// JOBS
router.post("/add-job", isAuthenticated, asyncHandler(addjob));
router.post("/edit-job/:jobid", isAuthenticated, asyncHandler(editjob));
router.post("/delete-job/:jobid", isAuthenticated, asyncHandler(deletejob));

// INTERNSHIPS
router.post("/add-intern", isAuthenticated, asyncHandler(addintern));
router.post("/edit-intern/:internid", isAuthenticated, asyncHandler(editintern));
router.post("/delete-intern/:internid", isAuthenticated, asyncHandler(deleteintern));

// RESPONSIBILITIES
router.post("/add-resp", isAuthenticated, asyncHandler(addresp));
router.post("/edit-resp/:respid", isAuthenticated, asyncHandler(editresp));
router.post("/delete-resp/:respid", isAuthenticated, asyncHandler(deleteresp));

// COURSES
router.post("/add-course", isAuthenticated, asyncHandler(addcourse));
router.post("/edit-course/:courseid", isAuthenticated, asyncHandler(editcourse));
router.post("/delete-course/:courseid", isAuthenticated, asyncHandler(deletecourse));

// PROJECTS
router.post("/add-proj", isAuthenticated, asyncHandler(addproj));
router.post("/edit-proj/:projid", isAuthenticated, asyncHandler(editproj));
router.post("/delete-proj/:projid", isAuthenticated, asyncHandler(deleteproj));

// SKILLS
router.post("/add-skill", isAuthenticated, asyncHandler(addskill));
router.post("/edit-skill/:skillid", isAuthenticated, asyncHandler(editskill));
router.post("/delete-skill/:skillid", isAuthenticated, asyncHandler(deleteskill));

// ACCOMPLISHMENTS
router.post("/add-acmp", isAuthenticated, asyncHandler(addacmp));
router.post("/edit-acmp/:acmpid", isAuthenticated, asyncHandler(editacmp));
router.post("/delete-acmp/:acmpid", isAuthenticated, asyncHandler(deleteacmp));

// RESUME ANALYSIS (PDF/Word Upload)
const handleUpload = (req, res, next) => {
  upload.single('resume')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.code === 'LIMIT_FILE_SIZE'
          ? 'File too large (max 5MB)'
          : err.message.includes('Unexpected end')
            ? 'Incomplete form data'
            : err.message || 'Invalid file upload'
      });
    }
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }
    next();
  });
};

router.post(
  "/analyze",
  isAuthenticated,
  handleUpload,
  asyncHandler(uploadAndAnalyze)
);


router.post(
  "/upload-photo",
  isAuthenticated,
  photoUpload.single("photo"),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No photo uploaded" });
    }
    const fileBase64 = req.file.buffer.toString("base64");
    const fileName = `avatar_${Date.now()}.${req.file.originalname.split('.').pop()}`;

    const result = await imagekit.upload({
      file: fileBase64,
      fileName,
      folder: "/avatars"
    });

    // ==== Yahan student ki profile update karo ====
    // Maan lo req.user.id me student ka id hai (isAuthenticated middleware se)
    const Student = require("../models/studentModel"); // apne model ka path sahi karo
    await Student.findByIdAndUpdate(
      req.user.id,
      { avatar: { url: result.url, fileId: result.fileId } },
      { new: true }
    );

    res.json({ success: true, url: result.url, fileId: result.fileId });
  })
);

module.exports = router;