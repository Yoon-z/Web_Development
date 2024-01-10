const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const TemplateSchema = new Schema({
    path: String,
});

const TemplateModel = model('Template', TemplateSchema);

module.exports = TemplateModel;