var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({ port : 8000, routes: { cors: true } });

server.views({
    engines: {
        html: require('ejs')
    },
    path: './view'
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public',
            listing: true
        }
    }
});

server.route({
    method : 'GET',
    path : '/',
    handler : function(req, reply){
        reply.view('index');
    }
});


server.start(function () {
    console.log('info', 'Server running at: ' + server.info.uri);
});
