const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://muksbaba:85AbAPSDcQixlXpe@saveit.dolqf43.mongodb.net/');

const PostSchema = new mongoose.Schema({
    data: String,
})

const PostModel = mongoose.model('Post', PostSchema);

module.exports = {
    PostModel,
}