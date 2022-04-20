var express = require('express');
var router = express.Router();


var route = function(io) {
	/* GET users listing. */
	router.get('/', function(req, res, next) {
	  res.render('users/index', { title: 'Users' });
	});

	io.on('connection', function(client) {
	    console.log('server - connect');
	    client.on('messages', function(data) {
			console.log(data);
	     	io.emit('messages',data);
	    });

	});

	return router;
};

module.exports = route;