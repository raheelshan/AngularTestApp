/**
* Module dependencies.
*/
var express = require('express');
var routes = require('./routes');
var products = require('./routes/products');
var http = require('http');
var path = require('path');
var expressHbs = require('express-handlebars');

var app = express();
var server = http.createServer(app)

app.set('port', process.env.PORT || 1338);
app.set('views', __dirname + '/views');

app.engine('hbs', expressHbs({extname:'html', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');

var favicon = require('express-favicon')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var middleware = require('less-middleware')
var errorHandler = require('express-error-handler')
var handler = errorHandler({
    handlers: {
        '404': function err404() {
            console.log('Found an error')
            next(err)
        }
    }
});

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());                          // parse application/json
app.use(bodyParser.urlencoded({ extended: true }));  // parse application/x-www-form-urlencoded
app.use(methodOverride());
app.use(cookieParser('sdajhfa99012#$#$sdassas'));

app.use(session({resave:true,saveUninitialized:true,secret:'uwotm8'}));

app.use(middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', routes.index);

app.get('/products', products.getProducts);
app.get('/products/getProductDetails', products.getProductDetails);
app.post('/products/addProduct', products.addProduct);
app.post('/products/addComment', products.addComment);


server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
