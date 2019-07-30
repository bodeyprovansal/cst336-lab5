$(document).ready(function(){
  $(".favoriteIcon").on("click", function() {
    //alert($(this).prev().attr("src"));
    
    var imageURL = $(this).prev().attr("src");
    
    if($(this).attr("src") == "img/fav_off.png") {
      $(this).attr("src", "img/fav_on.png");
      updateFavorite("add", imageURL); //INSERTs a new record
    } else {
      
      $(this).attr("src", "img/fav_off.png");
      updateFavorite("delete", imageURL); //deletes record
    }
  });
  
  $('#favorites').on('click', '.favoriteIcon', function() {
    var imageURL = $(this).prev().attr("src");  
    $(this).attr("src", "img/fav_off.png");
    updateFavorite("delete", imageURL); //deletes record
  });
  
  $(".keywordLink").on("click", function() {
    //alert($(this).text().trim());
    $.ajax({
      method:"get",
      url: "/api/displayFavorites",
      data: {
             "keyword" : $(this).text().trim()             
            },
      success: function(rows, status) {
        $("#favorites").html("");
        rows.forEach(function(row) {
          
          $("#favorites").append("<img class='image' src="+row.imageURL+" 'width='200' height='200'>");
          $("#favorites").append("<img class='favoriteIcon' src='img/fav_on.png' width=20>");
        })
      }
    });//ajax
  });
 
  function updateFavorite(action, imageURL) {
    console.log("ajax call with action: " + action + " and imageURL: " + imageURL);
    $.ajax({
      method:"get",
      url: "/api/updateFavorites",
      data: {"imageURL" : imageURL,
             "keyword" : $("#keyword").val(),
             "action" : action
            }
    });//ajax
  }

function removeFavorite(action, imageURL) {
  $.ajax({
      method:"get",
      url: "/api/displayFavorites",
      data: {"imageURL" : imageURL,
             "action" : action
            }
    });//ajax
  }
});