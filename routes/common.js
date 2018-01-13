const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const Project = mongoose.model('Project');
const User = mongoose.model('User');

router.get('/current_user', requireAuth, (req, res, next) => {
    const { firstName, lastName, createdUsers, isAdmin } = req.user;
    res.json({
        firstName,
        lastName,
        createdUsers,
        isAdmin
    });
});

router.get('/affiliated', requireAuth, async (req, res, next) => {
        if(req.user.isAdmin){
            try {
                const users = await User.find({ createdBy: req.user._id });
                const admin = await User.findById(req.user._id);
                res.send([ admin, ...users ]);
            } catch(err){
                res.send(err);
            }   
        } else {
            try {
                const users = await User.find({ createdBy: req.user.createdBy });
                res.send(users);
            } catch(err){
                res.send(err);
            }
        }
})

router.get('/project/:projectId', requireAuth, async (req, res, next) => {
    const { projectId } = req.params;

    try {
        const project = await Project.findById(projectId);
        res.send(project);
    } catch(err){
        res.send(err);
    }
})

module.exports = router;
