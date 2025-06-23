const express = require("express");
const router = express.Router();
const upload = require("../utiles/Multer");

const {
  homepage,
  employesignup,
  employesignin,
  employesignout,
  currentEmploye,
  employesendmail,
  employeforgetlink,
  employeresetpassword,
  employeupdate,
  employeavatar,
  createinternship,
  readinternship,
  readsingleinternship,
  createjob,
  readjob,
  readsinglejob,
  deleteemploye,
  closejob,
} = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth");

// GET /
router.get("/", homepage);

// POST / employe
router.post("/current", isAuthenticated, currentEmploye);

// POST / Delete
router.get("/delete", isAuthenticated, deleteemploye);

// POST /employe/signup
router.post("/signup", employesignup);

// POST /avatar/:id  <-- YAHI SIRF RAKHO!
router.post(
  "/avatar/:id",
  isAuthenticated,
  upload.single("organizationLogo"),
  employeavatar
);

// POST /employe/signin
router.post("/signin", employesignin);

// GET /employe/signout
router.get("/signout", isAuthenticated, employesignout);

// POST /employe/send-mail
router.post("/send-mail", employesendmail);

// POST /employe/forget-link
router.post("/forget-link", employeforgetlink);

// POST /employe/reset-password/:id
router.post("/reset-password/:id", isAuthenticated, employeresetpassword);

// POST /employe/update/:id
router.post("/update/:id", isAuthenticated, employeupdate);

// ===================INTERNSHIP====================

// POST /employe/internship/create
router.post("/internship/create", isAuthenticated, createinternship);

// POST /employe/internship/read
router.post("/internship/read", isAuthenticated, readinternship);

// POST /employe/internship/read/:id
router.post("/internship/read/:id", isAuthenticated, readsingleinternship);

// ===================JOBS====================

// POST /employe/job/create
router.post("/job/create", isAuthenticated, createjob);

// POST /employe/job/read
router.post("/job/read", isAuthenticated, readjob);

// POST /employe/job/read/:id
router.post("/job/read/:id", isAuthenticated, readsinglejob);

// POST /employe/job/close/:id
router.post("/job/close/:id", isAuthenticated, closejob);

module.exports = router;