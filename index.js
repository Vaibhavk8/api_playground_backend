const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Profile } = require("./models/models");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(console.error);

// Health Check
app.get("/health", (req, res) => res.send("OK"));

// ---------------- PROFILE ----------------

// Get profile
app.get("/profile", async (req, res) => {
  const profile = await Profile.findOne({});
  if (!profile) return res.status(404).json({ error: "No profile found" });
  res.json(profile);
});

// Create or Update profile
// CREATE profile
app.post('/profile', async (req, res) => {
  try {
    const profile = new Profile(req.body);
    await profile.save();
    return res.json({ message: 'Profile created', profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE profile
// index.js (backend)
app.put('/profile/:id', async (req, res) => {
  try {
    const updated = await Profile.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // ✅ only update provided fields
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Delete profile
app.delete("/profile", async (req, res) => {
  await Profile.deleteMany({});
  res.json({ message: "Profile deleted" });
});

// ---------------- PROJECTS ----------------

// Get projects (filter by skill if query param exists)
app.get("/projects", async (req, res) => {
  const { skill } = req.query;
  const profile = await Profile.findOne({});
  if (!profile) return res.status(404).json({ error: "No profile found" });

  if (skill) {
    const filtered = profile.projects.filter(p => 
      p.technologies && p.technologies.includes(skill)
    );
    return res.json(filtered);
  }
  res.json(profile.projects);
});

// Add project
app.post("/projects", async (req, res) => {
  const profile = await Profile.findOne({});
  if (!profile) return res.status(404).json({ error: "No profile found" });

  profile.projects.push(req.body);
  await profile.save();
  res.json({ message: "Project added", projects: profile.projects });
});

// Update project by index
app.put("/projects/:index", async (req, res) => {
  const { index } = req.params;
  const profile = await Profile.findOne({});
  if (!profile || !profile.projects[index]) 
    return res.status(404).json({ error: "Project not found" });

  profile.projects[index] = { ...profile.projects[index]._doc, ...req.body };
  await profile.save();
  res.json({ message: "Project updated", projects: profile.projects });
});

// Delete project by index
app.delete("/projects/:index", async (req, res) => {
  const { index } = req.params;
  const profile = await Profile.findOne({});
  if (!profile || !profile.projects[index]) 
    return res.status(404).json({ error: "Project not found" });

  profile.projects.splice(index, 1);
  await profile.save();
  res.json({ message: "Project deleted", projects: profile.projects });
});

// ---------------- EXPERIENCE ----------------

// Add experience
app.post("/experience", async (req, res) => {
  const profile = await Profile.findOne({});
  if (!profile) return res.status(404).json({ error: "No profile found" });

  profile.experience.push(req.body);
  await profile.save();
  res.json({ message: "Experience added", experience: profile.experience });
});

// Delete experience by index
app.delete("/experience/:index", async (req, res) => {
  const { index } = req.params;
  const profile = await Profile.findOne({});
  if (!profile || !profile.experience[index]) 
    return res.status(404).json({ error: "Experience not found" });

  profile.experience.splice(index, 1);
  await profile.save();
  res.json({ message: "Experience deleted", experience: profile.experience });
});

// ---------------- CERTIFICATIONS ----------------

// Add certification
app.post("/certifications", async (req, res) => {
  const { certification } = req.body;
  const profile = await Profile.findOne({});
  if (!profile) return res.status(404).json({ error: "No profile found" });

  profile.certifications.push(certification);
  await profile.save();
  res.json({ message: "Certification added", certifications: profile.certifications });
});

// Delete certification
app.delete("/certifications/:index", async (req, res) => {
  const { index } = req.params;
  const profile = await Profile.findOne({});
  if (!profile || !profile.certifications[index]) 
    return res.status(404).json({ error: "Certification not found" });

  profile.certifications.splice(index, 1);
  await profile.save();
  res.json({ message: "Certification deleted", certifications: profile.certifications });
});

// ---------------- SERVER ----------------

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
