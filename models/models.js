const mongoose = require("mongoose");


const EducationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  board: String,
  startDate: String,
  endDate: String,
  cgpa: String,
  percentage: String,
}, { _id: false });


const SkillSetSchema = new mongoose.Schema({
  languages: [String],
  dsa: String,
  frontend: [String],
  backend: [String],
  database: [String],
}, { _id: false });


const ProjectSchema = new mongoose.Schema({
  name: String,
  description: [String],
  technologies: [String],
  deployment: String,
}, { _id: false });


const ExperienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  location: String,
  startDate: String,
  endDate: String,
  responsibilities: [String],
}, { _id: false });


const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  summary: String,
  links: [{ id: Number, type: String, url: String }],
  education: [EducationSchema],
  skills: SkillSetSchema,
  projects: [ProjectSchema],
  experience: [ExperienceSchema],
  certifications: [String],
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = { Profile };
