var mysql = require('mysql')
exports.getProducts = function(request, response){
	var connection = mysql.createConnection({
		user: "root",
		password: "",
		database: "angulartestapp"
	});

	connection.query('SELECT * FROM products;', function (error, rows, fields) {
		response.json(rows);
		response.end();
	});
};
exports.getProductDetails = function(request, response){
	var connection = mysql.createConnection({
		user: "root",
		password: "",
		database: "angulartestapp"
	});
	var id = request.query.id

	var responseData = {}
	connection.query('SELECT * FROM products where id = '+ id, function (error, rows, fields) {
		responseData.product = rows[0]
		connection.query('SELECT * FROM comments where product_id = '+ id, function (error, rows, fields) {
			responseData.comments = rows
			response.json(responseData);
			response.end();
		});	
	});
};
exports.addProduct = function(request, response){
	var connection = mysql.createConnection({
		user: "root",
		password: "",
		database: "angulartestapp"
	});
	var post  = [
	  request.body.name,
	  request.body.description,
	  request.body.price,
	];	
	var query = 'INSERT INTO products (name , description , price) values (?,?,?)';
	connection.query(query,post, function (error, results) {
			
		if(results.insertId > 0){
			response.json({success:true});
			response.end();
		}
	});
};

exports.addComment = function(request, response){
	var connection = mysql.createConnection({
		user: "root",
		password: "",
		database: "angulartestapp"
	});
	var post  = [
	  request.body.product_id,
	  request.body.comment,
	  0,
	  new Date
	];	
	var query = 'INSERT INTO comments (product_id , comment , parent, datetime) values (?,?,?,?)';
	connection.query(query,post, function (error, results) {
			
		if(results.insertId > 0){
			response.json({success:true});
			response.end();
		}
	});
};
