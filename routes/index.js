var express = require('express');
var router = express.Router();
var Users = require('../models/users');
var Blogs = require('../models/blogs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Go Blog!' });
});

/* GET about page. */
router.get('/about',function(req, res){
	res.render('about')
});

/* GET signUp page. */
router.get('/signUp',function(req, res){
	res.render('signUp')
});

/* POST signUp page. */
router.post('/signUp',function(req, res){
	console.log('req....', req.body);
	var user = new Users({
		username: req.body.username,
		password: req.body.password
	});

	var promise = user.save();
	promise.then((user) => {
		console.log("user signed up");
		res.redirect('/login');
	})

});

/* GET login page. */
router.get('/login',function(req, res){
	res.render('login');
});

/* POST login page. */
router.post('/login',function(req, res){
	// console.log('req.....', req.body);
	if(req.body.username && req.body.password){
		Users.findOne({ username: req.body.username, password: req.body.password}, function(err,user){
			console.log("login is successful");
			res.redirect('/');

		})

	}

	else{
		console.log("Please enter username and password.");
	}
});

/* GET addBlog page. */
router.get('/addBlog',function(req, res){
	res.render('addBlog')
});

router.post('/addBlog',function(req, res, next){
	//console.log('req....',req.body);
	var blog = new Blogs({
		title: req.body.title,
		blog: req.body.blog
	});

	var promise = blog.save()
	promise.then((blog)=>{
		console.log('Saved note is:', blog);

		Blogs.find().exec(function(err, blogs){
			res.render('viewBlog', {blogs})
		});
	})
});

/* GET viewBlog page. */

router.get('/viewBlog',function(req, res){
	Blogs.find().exec(function(err, blogs){
		res.render('viewBlog', {blogs})
	});
});

/* GET editBlog. */
router.get('/editblog/:id', function(req, res){
	console.log('edited blog is', req.params.id); //takes route
	Blogs.findOne({_id: req.params.id}).exec(function(err, blog){
		res.render('editBlog',{blog})
	})
})


router.post('/editblog', function(req, res){
	Blogs.findOneAndUpdate({_id: req.body._id}, {$set: req.body}, (err, blog) => { //takes value from body
		console.log('Updated blog is', blog);
		if(!err) res.redirect('/viewBlog')
	})
})

router.get('/deleteblog/:id', function(req, res) {
	console.log('deleted blog is', req.params.id);
	Blogs.remove({_id: req.params.id}, function(err, blog) {
    	res.redirect('/viewBlog')
  	});
})

module.exports = router;
