var express = require("express");
var router = express.Router();
//var bodyParser = require("body-parser");
// create application/json parser
// create application/x-www-form-urlencoded parser

let myusername="thesneem";
let mypassword="123";

/* GET home page. */
router.get("/",function(req, res) {
	//console.log(req.session.loggedin);
	//
	//res.redirect('/');
	if(req.session.loggedin){
		//console.log(req.session.loggedin);
		let username=req.session.username;
		res.render("home",{username});
      
	}
	else{
		res.render("index");
	}
  
});



/*HOME page/*/

router.post("/login",check,function(req,res){
	res.render("home",{username:req.body.username});
});

// a variable to save a session
//var session;

function check(req,res,next){
	if(req.body.username == myusername && req.body.password == mypassword){
		//console.log(req.body);
		req.session.loggedin=true;
  
		req.session.username = myusername;
		console.log(req.session.loggedin);
		//session=req.session;
		next();
	}
	else{
		req.session.error=true;
		res.render("index",{error:req.session.error});
		//res.redirect('/');
	}
}

/*Logout to loginpage*/
router.get("/logout",function(req,res){
	req.session.loggedin=false;
	req.session.destroy();
	res.redirect("/");
});

/*Cart*/
let products=[
	{
		name:"Samsung",
		Image:"https://rukminim1.flixcart.com/image/416/416/kqqykcw0/mobile/j/5/7/galaxy-f22-sm-e225flbdins-samsung-original-imag4z99fp4qdfby.jpeg?q=70",
		price:7000
	},
	{
		name:"Motorola",
		Image:"https://rukminim1.flixcart.com/image/416/416/l1l1rww0/mobile/v/7/n/-original-imagd48zkjwujxzz.jpeg?q=70",
		price:10000
	},
  
];

/*Directing to cart*/
router.get("/cart", function(req, res) {
	res.render("cart",{products});
});

module.exports = router;
