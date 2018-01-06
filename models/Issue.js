const mongoose = require('mongoose');
const { Schema } = mongoose;

const issueSchema = new Schema({
	issueType: String,
	summary: String,
	description: String,
	priority: { type: String, default: 'Medium' },
	assignee: { type: Schema.Types.ObjectId, ref: 'User' },
	attachments: [{ data: Buffer, contentType: String }],
	reporter: { type: Schema.Types.ObjectId, ref: 'User' },
	project: { type: Schema.Types.ObjectId, ref: 'Project' }
})

mongoose.model('issues', issueSchema);