
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' , message : 'Welcome to Express using Handlebars' });
};