var mongoose = require('mongoose'),
    mockgoose = require('mockgoose');

// Load up model fixtures
require('./fixtures');

// Mock out mongoose
mockgoose(mongoose);

// Start the server
var app = require('../server');

describe('API', function() {
    require('./controllers/images');
});

describe('Services', function() {

});
