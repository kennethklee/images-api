var fs = require('fs'),
    tempWrite = require('temp-write'),
    models = require('../models'),
    cloudinary = require('cloudinary');

// Get an image
exports.get = function(req, res, next, id) {
    models.Image.findById(id).exec(function(err, image) {
        if (!image) {
            return res.status(404).end();
        }
        req.image = image;
        next();
    });
}

// List
exports.list = function(req, res) {
    models.Image
        .find({})
        .sort('-created_at')
        .paginate(req.query.page || 1, req.query.pageSize || 10)
        .exec(function(err, docs) {
            res.send(docs);
        });
};

// Create
exports.create = function(req, res) {
    if (!req.body) {
        return res.status(400).end();
    }

    tempWrite(req.body, function(err, filepath) {
        var image = new models.Image();

        image.uploadAndSave(filepath, function(err) {
            if (err) {
                return res.status(400).end();
            }
            fs.unlinkSync(filepath);
            res.status(201).send(image);
        });
    });
};

// Show
exports.show = function(req, res) {
    res.format({
        html: function() {
            // TODO add facebook and twitter meta tags
            res.send('<html><body><img src="' + cloudinary.url(req.image.public_id, {format: 'jpg'}) + '"/></body></html>');
        },
        json: function() {
            res.send(req.image);
        }
    });
};

// Delete
exports.delete = function(req, res) {
    req.image.remove(function(err) {
        res.status(204).end();
    });
};


