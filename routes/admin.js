const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireAdmin = require('../middleware/requireAdmin');

router.get('/test', requireAuth, requireAdmin('isAdmin'), (req, res, next) => {
	res.send("Authorized");
})

router.post('/create', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	const { title, type, abbreviation, description } = req.body;
	const newProject = new Project({ title, type, abbreviation, description });

	if(!title || !type || !abbreviation || !description){
		return res.status(422);
	}

	try {
		const saveProject = await newProject.save();
		res.status(200);
		res.json({ message: `Project successfully created!` });
	} catch(err) {
		res.status(500).send({ error: 'Oops! Something went wrong.' });
		return false;
	}
});

router.put('/:projectId', requireAuth, requireAdmin('isAdmin'), (req, res, next) => {

});

router.delete('/:projectId', requireAuth, requireAdmin('isAdmin'), (req, res, next) => {

});

router.post('/addCollaborators/:projectId', requireAuth, (req, res, next) => {

});

router.delete('/removeCollaborators/:projectId', requireAuth, (req, res, next) => {

});

router.delete('/removeUsers/:users', requireAuth, (req, res, next) => {

});

router.put('/updateUser/:userId', requireAuth, (req, res, next) => {

});

module.exports = router;