
var express = require('express');
var router = express.Router();
var AuthConfig= require('../config/auth');
var request = require('request');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
    res.render('index');
});

// //TV/MOVIE SEARCH ROUTES
// //-----------------------------------
// //Get a tv show
// router.get('/api/tvresults',function(req,res){
//     var query = req.query.search;
//     var url = 'https://api.themoviedb.org/3/search/tv?api_key='+AuthConfig.movieDB.apiKey+'&query='+query;
//     request(url,function(error,response,body){
//         if(!error && response.statusCode == 200){
//             var data = JSON.parse(body);
//             res.render('tv',{data:data});
//             console.log(data["results"]);
//         }
//     });
// });
//Get a movie results and tv shows 
router.get('/api/results',function(req,res){
    var query = req.query.search;
    var url = 'https://api.themoviedb.org/3/search/multi?api_key='+AuthConfig.movieDB.apiKey+'&query='+query;
    request(url,function(error,response,body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render('results',{data:data});
            console.log(data["results"]);
        }
    });
});

//Get a picture
//You need the base_url,size and file path
//image["images"] img["base_url"]
//image["images"] img["logo_sizes][0]
//data["results"] tv["poster_path"] or movie["
// base_url & size come from this get request
// var baseurl = img["base_url"];
// var size = img["logo_sizes"][0];
//file_path comes from the tv["poster_path"]
router.get('/api/picture',function(req,res){
    var baseUrl =  'https://api.themoviedb.org/3/configuration?api_key='+AuthConfig.movieDB.apiKey;
    request(baseUrl,function(error,response,body){
        if(!error && response.statusCode == 200){
            var imgdata = JSON.parse(body);
            res.send('results',{imgdata:imgdata});
        }
    });
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        console.log('You are not logged in playa.Log in.');
        req.flash('error msg','You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;