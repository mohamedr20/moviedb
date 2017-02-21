var request = require('supertest');
var assert = require('assert');
var express =require('express');
var app = express();

describe('GET /', function() {
    it('respond with login screen', function(done) {
        request(app)
            .get('http://localhost:3000/users/login')
            .expect(200, done);
    });
});