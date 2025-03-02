const express = require("express");
const Project = require("../models/Project"); // Import Project model
const router = express.Router();

// 🟢 Create a New Project
router.post("/", async (req, res) => {
    try {
        const { title, description, status, userId } = req.body;
        const newProject = new Project({ title, description, status, userId });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: "Error creating project" });
    }
});

// 🔵 Get All Projects
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: "Error fetching projects" });
    }
});

// 🟡 Get a Single Project by ID
router.get("/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ error: "Project not found" });
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: "Error fetching project" });
    }
});

// 🟠 Update a Project
router.put("/:id", async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { title, description, status },
            { new: true }
        );
        if (!updatedProject) return res.status(404).json({ error: "Project not found" });
        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ error: "Error updating project" });
    }
});

// 🔴 Delete a Project
router.delete("/:id", async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) return res.status(404).json({ error: "Project not found" });
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting project" });
    }
});

module.exports = router;
