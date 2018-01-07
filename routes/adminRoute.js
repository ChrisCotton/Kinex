const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Project = mongoose.model('Project');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireAdmin = require('../middleware/requireAdmin');

router.post('/createUser', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
  const { username, password, firstName, lastName, isAdmin } = req.body;
  const newUser = new User({ username, password, firstName, lastName, isAdmin });

  if(!username || !firstName || !lastName){
  	return res.status(422).send({ error: 'You must fill in all the required fields.' });
  }

	try {
		const existingUser = await User.findOne({ username });
		if(existingUser){
			return res.status(422).send({ error: 'Username already in use.' });
		}
	} catch (err){
		next(err);
	}

	try {
		const saved = await newUser.save();
		res.status(200);
		res.json({ message: 'Your account was registered!' });
		return true;
	} catch(err) {
		console.log(err);
		console.log(`Internal Server Error, User.save(${JSON.stringify(newUser)})`);
		return false;
	}
});

router.get('/projects', requireAuth, requireAdmin('isAdmin'), (req, res, next) => {
	Project.find({ owner: req.user._id })
	.then(result => res.send(result))
	.catch(err => next(err));
})

router.delete('/deleteUsers', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	const { users } = req.body;

	try {
		const user = await User.remove({ _id: { $in: users } });
		res.status(200).send(user);
	} catch(err){
		res.status(404).send(err);
	}
});

router.post('/create', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	const { title, type, abbreviation, description } = req.body;
	const newProject = new Project({ title, type, abbreviation, description, owner: req.user._id });

	if(!title || !type || !abbreviation || !description){
		return res.status(422);
	}

	try {
		const saveProject = await newProject.save();
		res.status(200);
		res.json({ message: `Project successfully created!` });
	} catch(err) {
		res.status(500).send({ error: 'Oops! Something went wrong.' });
	}
});

router.put('/:projectId', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	const { projectId } = req.params;
	const { title, type, abbreviation, description } = req.body;

	try {
		const project = await Project.findById(projectId);
		project.title = title;

		const saved = await project.save();
		res.status(200).send(saved);
	} catch(err){
		res.status(500).send(err);
	}
});

router.delete('/:projectId', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	const { projectId } = req.params;

	try {
		const remove = await Project.findByIdAndRemove(projectId);
		res.status(200).send(remove);
	} catch(err){
		res.status(404).send(err);
	}
});

router.post('/addCollaborators/:projectId', requireAuth, async (req, res, next) => {
	const { projectId } = req.params;
	const { users } = req.body;

	try {
		const project = await Project.findById(projectId);
		const added = await project.addCollaborators(users);
		res.status(200).send(project);
	} catch(err){
		res.status(500).send({ error: 'Oops! Something went wrong.' });
	}
});

router.delete('/removeCollaborators/:projectId', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	const { projectId } = req.params;
	const { users } = req.body;

	try {
		const project = await Project.findById(projectId);
		const updated = await project.update({ $pull: { collaborators: { $in: users }} }, { multi: true });
		res.status(200).send(updated);
	} catch(err){
		res.status(404).send(err);
	}
});

module.exports = router;