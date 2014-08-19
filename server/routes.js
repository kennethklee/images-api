var bodyParser = require('body-parser'),
    images = require('./controllers/images');


module.exports = function(app) {
    app.param('image_id', images.get);

    // Image Resource
    app.route('/images')
        .get(images.list)
        .post(bodyParser.raw({type: 'jpeg'}), images.create);

    app.route('/images/:image_id')
        .get(images.show)
        .delete(images.delete);

};
