const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/attendanceDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const Student = mongoose.model("Student", {
  email: String,
  password: String
});

const Attendance = mongoose.model("Attendance", {
  email: String,
  present: Boolean
});

// Register
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  await Student.create({ email, password });
  res.send("Registered successfully");
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Student.findOne({ email, password });

  if (user) res.send("Login success");
  else res.status(401).send("Invalid credentials");
});

// Mark attendance
app.post("/mark-attendance", async (req, res) => {
  const { email, present } = req.body;
  await Attendance.create({ email, present });
  res.send("Attendance marked");
});

// Get attendance
app.get("/attendance/:email", async (req, res) => {
  const records = await Attendance.find({ email: req.params.email });

  let total = records.length;
  let present = records.filter(r => r.present).length;

  let percentage = total ? (present / total) * 100 : 0;

  res.send({ percentage });
});

app.listen(5000, () => console.log("Server running on port 5000"));