var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    timestamps = require('mongoose-timestamp'),
    uid = require('uid2'),
    cloudinary = require('cloudinary');

var ImageSchema = new Schema({
    _id: {type: String, default: function() {return uid(6);}},
    public_id: String
});

ImageSchema.plugin(timestamps);

ImageSchema.methods.uploadAndSave = function(imageFile, callback) {
    var self = this;

    cloudinary.uploader.upload(imageFile, function(image) {
        self.public_id = image.public_id;
        self.save(callback);
    }, {public_id: this._id});
};

ImageSchema.pre('remove', function(done) {
    var self = this;

    cloudinary.uploader.destroy(this.image, function(err, images) {
        done();
    });
});

module.exports = mongoose.model('images', ImageSchema);
