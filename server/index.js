var config = require('../config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    pagination = require('mongoose-pagination'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    cloudinary = require('cloudinary'),
    routes = require('./routes');

var app = module.exports = express();

mongoose.connect(config.mongo.uri);

app.use(cors());

if (config.env === 'production') {
    cloudinary.config({
        cloud_name: config.cloudinary.name,
        api_key: config.cloudinary.key,
        api_secret: config.cloudinary.secret
    });
} else {
    // Fake it
    console.log('Using Fake Cloudinary');

    cloudinary.uploader.upload = function(filePath, callback, options) {
        callback({public_id: options.public_id});
    };
    cloudinary.uploader.destroy = function(public_id, callback, options) {
        callback();
    };
    cloudinary.config({cloud_name: config.env});
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

routes(app);
