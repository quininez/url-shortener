var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");

var connection = mongoose.createConnection("mongodb://localhost/urls");

autoIncrement.initialize(connection);

var urlSchema = new Schema({
    original_url: String
});

urlSchema.plugin(autoIncrement.plugin, 'URL');
var URL = connection.model('URL', urlSchema);

module.exports = URL;