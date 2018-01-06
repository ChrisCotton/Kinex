const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
	title: { type: String, required: true },
	type: { type: String, required: true },
	abbreviation: { type: String, required: true },
	description: { type: String, required: true },
	owner: { type: Schema.Types.ObjectId, ref: 'User' },
	collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

mongoose.model('Project', projectSchema);