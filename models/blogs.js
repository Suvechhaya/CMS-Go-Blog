var mongoose = require('mongoose');
const BlogSchema = mongoose.Schema({
	title: String,
	blog: String,
	createdData: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Blogs',BlogSchema)