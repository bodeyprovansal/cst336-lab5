//unsplash key: c74467ea14b6923c23dce610d15a9afc6dd0fbf6b5039fa10587cc64f475e700

const express = require('express');
const app = express();
const tools = require('./tools.js');

app.set('view engine', 'ejs');
app.use(express.static("public"));

const request = require('request');
const mysql = require('mysql');

app.get("/", async function(req, res) {
 
    var imageURLs = await tools.getRandomImages("", 1);
    res.render("index", {"imageURLs":imageURLs});
});//root route

app.get("/search", async function(req, res){
    var keyword = req.query.keyword;
    var imageURLs = await tools.getRandomImages(keyword, 9);
    console.log("imagesURLs using Promises: " + imageURLs);
    res.render("results", {"imageURLs":imageURLs, "keyword": keyword});
    //getRandomImages_cb(keyword, 9, function(imageURLs) {
      //console.log("imageURLs: "+ imageURLs);
      //res.render("results", {"imageURLs":imageURLs});
    //}) 
    
}); //search

app.get("/api/updateFavorites", function(req, res) {
  
  var conn = tools.createConnection();
  var sql;
  var sqlParams;
  
  if(req.query.action == "add") {
    sql = "INSERT INTO favorites (imageURL, keyword) VALUES (?, ?)";
    sqlParams = [req.query.imageURL, req.query.keyword];
  } else {
    sql = "DELETE FROM favorites WHERE imageURL = ?";
    sqlParams = [req.query.imageURL];
  }
  conn.connect( function(err) {
    if(err) throw err;
    conn.query(sql, sqlParams, function(err, result) {
      if (err) throw err;
    });//query
  });//connect
  
  res.send("itworks");
});//route

app.get("/displayKeywords", async function(req, res) {
  var imageURLs = await tools.getRandomImages("", 1);
  var conn = tools.createConnection();
  var sql = "SELECT DISTINCT keyword FROM favorites ORDER BY keyword";

  conn.connect( function(err) {
    if (err) throw err;
    conn.query(sql, function(err, result) {
      if(err) throw err;
      res.render("favorites", {"rows":result, "imageURLs":imageURLs});
      
    });//query
  });//connection
});//display keywords route

app.get("/api/displayFavorites", function(req, res) {
  var conn = tools.createConnection();
  var sql = "SELECT imageURL FROM favorites WHERE keyword = ?";
  var sqlParams = [req.query.keyword];
 
  if(req.query.action == "delete") {
    sql = "DELETE FROM favorites WHERE imageURL = ?";
    sqlParams = [req.query.imageURL];
  } 
  conn.connect( function(err) {
    if (err) throw err;
    conn.query(sql, sqlParams, function(err, results) {
      if(err) throw err;
      res.send(results);
      
    });//query
  });//connection
});//route

/*app.listen("8081", "0.0.0.0", function() {
  console.log("Express server is running...");
});*/
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Express Server is running.");
});