const Project = require("../models/Project");

const getDashboardStats = async (req, res) => {
    try {
        const projects = await Project.find();
        const totalProjects = projects.length;
        const activeProjects = projects.filter(p => p.status === "Active").length;
        const completedProjects = projects.filter(p => p.status === "Completed").length;
        const pendingProjects = projects.filter(p => p.status === "Pending").length;
        
        const totalTasks = projects.reduce((sum, p) => sum + p.tasks.length, 0);
        const completedTasks = projects.reduce((sum, p) => sum + p.tasks.filter(t => t.completed).length, 0);
        const taskCompletionRate = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
        
        res.json({
            totalProjects,
            activeProjects,
            completedProjects,
            pendingProjects,
            taskCompletionRate,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getDashboardStats };
