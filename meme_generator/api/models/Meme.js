const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const MemeSchema = new Schema({
    meme_path: String,
});

const MemeModel = model('Meme', MemeSchema);

module.exports = MemeModel;