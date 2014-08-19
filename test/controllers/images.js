var fs = require('fs'),
    request = require('supertest'),
    agent = require('superagent'),
    http = require('http'),
    should = require('should'),
    fixtures = require('node-mongoose-fixtures'),
    app = require('../../server');

describe('Images', function() {
    before(function(done) {
        fixtures('images', done);
    });

    after(function(done) {
        fixtures.reset(done);
    });

    it('should return a 404', function(done) {
        request(app)
            .get('/images/doesnotexist')
            .accept('json')
            .expect(404, done);
    });

    it('should return a list of all images', function(done) {
        request(app)
            .get('/images')
            .accept('json')
            .expect(200)
            .end(function(err, res) {
                res.body.length.should.be.greaterThan(0);
                done();
            });
    });

    it('should return a single image in JSON', function(done) {
        request(app)
            .get('/images/test-image-1')
            .accept('json')
            .expect(200, done);
    });

    it('should return a single image in HTML', function(done) {
        request(app)
            .get('/images/test-image-1')
            .expect(200)
            .expect(/<html>/)
            .expect(/photo1\.jpg/, done);
    });

    it('should create new snapshots with different versions', function(done) {
        var stream = fs.createReadStream('./test/fixtures/sample.jpg');
        var req = agent('POST', request.Test.prototype.serverAddress(http.createServer(app), '/images'))
            .accept('json')
            .type('jpeg');

        req.on('response', function(res) {
            res.body.public_id.should.equal(res.body._id);
            done();
        });

        stream.pipe(req);
    });

    it('should delete snapshot along', function(done) {
        request(app)
            .delete('/images/test-image-1')
            .expect(204, done);
    });

});
