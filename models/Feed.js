const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedSchema = new Schema({
    text: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    created: { type: Date, default: Date.now }
})

mongoose.model('Feed', feedSchema);