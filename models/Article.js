const {Schema, model, Types} = require("mongoose")

const schema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: Date, default: Date.now},
    owner: {type: Types.ObjectId, ref: 'User'}
})
module.exports = model('Article', schema)