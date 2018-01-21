const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Feed = mongoose.model('Feed');
const Project = mongoose.model('Project');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireAdmin = require('../middleware/requireAdmin');

router.post('/project', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	const { title, type, abbreviation, description } = req.body;
	const newProject = new Project({ title, type, abbreviation, description, owner: req.user._id });

	const newFeed = new Feed({
		text: `${req.user.firstName} ${req.user.lastName} created ${newProject.title}.`,
		createdBy: req.user._id
	})

	if (!title || !type || !abbreviation || !description) {
		return res.status(422);
	}

	try {
		const saveProject = await newProject.save();
		const saveFeed = await newFeed.save();
		res.send(saveProject);
	} catch (err) {
		res.status(500).send({ error: 'Oops! Something went wrong.' });
	}
});

router.post('/createUser', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	const { username, password, firstName, lastName } = req.body;
	const newUser = new User({ username, password, firstName, lastName, isAdmin: false, createdBy: req.user._id });

	const newFeed = new Feed({
		text: `${req.user.firstName} ${req.user.lastName} created a new User: ${newUser.username}.`,
		createdBy: req.user._id
	})

	if (!username || !firstName || !lastName) {
		return res.status(422).send({ error: 'You must fill in all the required fields.' });
	}

	try {
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(422).send({ error: 'Username already in use.' });
		}
	} catch (err) {
		next(err);
	}

	try {
		const saved = await newUser.save();
		const saveFeed = await newFeed.save();
		res.status(200);
		res.send(saved);
	} catch (err) {
		console.log(err);
		console.log(`Internal Server Error, User.save(${JSON.stringify(newUser)})`);
	}
});

router.get('/createdUsers', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	try {
		const users = await User.find({ createdBy: req.user._id });
		res.send(users);
	} catch (err) {
		res.send(err);
	}
})

router.get('/projects', requireAuth, async (req, res, next) => {
	if (req.user.isAdmin) {
		try {
			const projects = await Project.find({ owner: req.user._id });
			res.send(projects);
		} catch (err) {
			res.send(err);
		}

	} else {
		try {
			const projects = await Project.find({ owner: req.user.createdBy });
			res.send(projects);
		} catch (err) {
			res.send(err);
		}
	}
})

router.delete('/deleteUsers', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	const { users } = req.body;

	try {
		const user = await User.remove({ _id: { $in: users } });
		res.status(200).send(user);
	} catch (err) {
		res.status(404).send(err);
	}
});

router.put('/project/:projectId', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	const { projectId } = req.params;
	const { title, type, abbreviation, description } = req.body;

	try {
		const project = await Project.findById(projectId);
		const newFeed = new Feed({
			text: `${req.user.firstName} ${req.user.lastName} edited ${project.title}.`,
			createdBy: req.user._id
		});

		project.title = title;
		project.type = type;
		project.abbreviation = abbreviation;
		project.description = description;

		const saved = await project.save();
		const saveFeed = await newFeed.save();
		res.status(200).send(saved);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.delete('/project/:projectId', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	const { projectId } = req.params;
	const newFeed = new Feed({
		text: `${req.user.firstName} ${req.user.lastName} deleted project with ID: ${projectId}.`,
		createdBy: req.user._id
	})

	try {
		const remove = await Project.findByIdAndRemove(projectId);
		const saveFeed = await newFeed.save();
		res.status(200).send(remove);
	} catch (err) {
		res.status(404).send(err);
	}
});

router.delete('/user/:userId', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	const { userId } = req.params;
	const newFeed = new Feed({
		text: `${req.user.firstName} ${req.user.lastName} deleted User with ID: ${userId}.`,
		createdBy: req.user._id
	})

	try {
		const remove = await User.findByIdAndRemove(userId);
		const saveFeed = await newFeed.save();
		res.status(200).send(remove);
	} catch (err) {
		res.status(404).send(err);
	}
});

router.post('/addCollaborators/:projectId', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	const { projectId } = req.params;
	const { users } = req.body;

	try {
		const project = await Project.findById(projectId);
		const added = await project.addCollaborators(users);
		res.status(200).send(project);
	} catch (err) {
		res.status(500).send({ error: 'Oops! Something went wrong.' });
	}
});

router.delete('/removeCollaborators/:projectId', requireAuth, requireAdmin('isAdmin'), async (req, res, next) => {
	const { projectId } = req.params;
	const { users } = req.body;

	try {
		const project = await Project.findById(projectId);
		const updated = await project.update({ $pull: { collaborators: { $in: users } } }, { multi: true });
		res.status(200).send(updated);
	} catch (err) {
		res.status(404).send(err);
	}
});

module.exports = router;