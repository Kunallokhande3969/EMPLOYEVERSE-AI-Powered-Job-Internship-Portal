require("dotenv").config();

const express = require("express");
const app = express();

// ===== Logger (Morgan) =====
const logger = require("morgan");
app.use(logger("tiny"));

// ===== Database Connection =====
require("./models/database").connectDatabase();

// ===== CORS =====
const cors = require("cors");
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
}));

// ===== Body Parsers =====
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ===== Session and Cookies =====
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET || "defaultsecret",
  })
);

// ===== Routes =====
app.use("/", require("./routes/indexRouter"));
app.use("/resume", require("./routes/resumeRoutes")); // Resume CRUD + Analyze
app.use("/employe", require("./routes/employeRouter"));

// ===== Error Handling =====
const ErrorHandler = require("./utiles/ErorrHandler");
const { generatedErorrs } = require("./middlewares/erorrs");

// Catch-all route
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Requested URL Not Found: ${req.url}`, 404));
});

// Error Middleware
app.use(generatedErorrs);

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));