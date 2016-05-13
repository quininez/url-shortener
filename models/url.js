var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");
var dbpath = process.env.MONGODB_URI || 'mongodb://localhost:27017/urls' || 'mongodb://gigikent:parola22@ds011482.mlab.com:11482/heroku_ptkbmgr9';

var connection = mongoose.createConnection(dbpath);

autoIncrement.initialize(connection);

var urlSchema = new Schema({
    original_url: String
});

urlSchema.plugin(autoIncrement.plugin, 'URL');
var URL = connection.model('URL', urlSchema);

module.exports = URL;