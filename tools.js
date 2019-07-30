const request = require('request');
const mysql = require('mysql');

module.exports = {
  //Return random image URL from API
  //@param string keyword - search term
  //@param int imageCount - number of random images
  // @return array of random images
  getRandomImages_cb: function (keyword, imageCount, callback) {
    var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=c74467ea14b6923c23dce610d15a9afc6dd0fbf6b5039fa10587cc64f475e700&orientation=landscape";
      request(requestURL, function (error, response, body) {
      if(!error) {
        var parsedData = JSON.parse(body);
        //console.log("image URL: ", parsedData["urls"]["regular"]);
        var imageURLs = [];
        for (let i=0; i < 9; i++) {
          imageURLs.push(parsedData[i].urls.regular);
        }
        console.log(imageURLs);
        callback(imageURLs);
        //return imageURLs;
      } else {      
        console.log("error", error);
      }  
    });
  },

  //Return random image URL from API
  //@param string keyword - search term
  //@param int imageCount - number of random images
  // @return array of random images
  getRandomImages: function (keyword, imageCount) {
    var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=c74467ea14b6923c23dce610d15a9afc6dd0fbf6b5039fa10587cc64f475e700&orientation=landscape";

    return new Promise( function(resolve, reject) {
      request(requestURL, function (error, response, body) {
        if(!error) {
          var parsedData = JSON.parse(body);
          //console.log("image URL: ", parsedData["urls"]["regular"]);
          var imageURLs = [];
          for (let i=0; i < imageCount; i++) {
            imageURLs.push(parsedData[i].urls.regular);
          }
          console.log(imageURLs);
          resolve(imageURLs);
          //return imageURLs;
          } else {      
            console.log("error", error);
          }  
      });//request
    });//promise
  },
  /**
  *creates database connection
  *@return db connection
  */
  createConnection: function() {
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "img_gallery"
      });
    return conn;
  }
}