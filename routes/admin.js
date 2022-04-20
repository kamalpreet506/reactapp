var express = require('express');
var router = express.Router();
var _onlineUsers={};

var route = function(io) {
	/* GET users listing. */
	router.get('/', function(req, res, next) {
	  res.render('admin/index', { title: 'Admin' });
	});

	io.on('connection', function(client) {
	    console.log('admin - connect');

	    client.on('newuser',function(data,callback){
	    	

	    	if(data.userid in _onlineUsers){
	    		callback(false);
				
	    	}else{
	    		callback(true);
	    		updateOnlineUsers(data);
	    	}
	    });

	    function updateOnlineUsers(data){
	    	_onlineUsers[data.userid] = data;
	    	io.emit('updateusers', _onlineUsers);
    	}

	});

	return router;
};


module.exports = route;
