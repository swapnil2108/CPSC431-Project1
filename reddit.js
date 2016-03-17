var main = function() {
    "use strict";
    function myfunction() {
        $.get("http://localhost:3000/reddit", function(getData){
        getData.forEach(function(reddit) {
       var imgId=reddit.id;
			 var postsList ="<div class ='postContent'>"
							+"<div class = 'votes'>"
							+"<img  id="+imgId+" class='voteUpButton' src='image/up.png'>"+"<br>"
                            +"<strong id ="+reddit.id+" class='votesNum'>"+"</strong>"+"<br>"
                            +"<img  id="+imgId+" class='voteDownButton' src='image/down.png'>"
							+"</div>"
							+"<div class ='Content-List'>"
							+"<p>"+"<a href="+JSON.stringify(reddit.main_link)+">"+reddit.link_title+"</a>"
							+"</p>"
							+"</div>";
			  $(postsList).appendTo('div.postsContainer');

			  $("#"+reddit.id+".votesNum").text(reddit.likes);
      });//end of ForEach loop

      //Vote up event:
      $("img.voteUpButton").on("click", function(){
           var $imgId= this.id, main_link, link_title, image_link ,result=$("#"+this.id+".votesNum").text();
           result++;// result is the number of likes after increasing or decreasing

           //get request to get other reddit.json elements by using only the ID:
           $.get("http://localhost:3000/reddit/"+$imgId, function(getData){
             main_link=getData.main_link;
             link_title=getData.link_title;
             image_link=getData.image_link;
             $.ajax({type:"PUT", url:"http://localhost:3000/reddit/"+ $imgId, data:{"id":$imgId,"image_link":image_link, "likes":result,"link_title":link_title ,"main_link":main_link, "post":"submitted"} });
          });
      });

      //Vote down event:
      $("img.voteDownButton").on("click",function(){
          var $imgId= this.id, main_link, link_title, image_link, result=$("#"+this.id+".votesNum").text();
          result--;// result is the number of likes after increasing or decreasing

          //get request to get other reddit.json elements by using only the ID:
          $.get("http://localhost:3000/reddit/"+$imgId, function(getData){
            main_link=getData.main_link;
            link_title=getData.link_title;
            image_link=getData.image_link;
            $.ajax({type:"PUT", url:"http://localhost:3000/reddit/"+ $imgId, data:{"id":$imgId,"image_link":image_link, "likes":result,"link_title":link_title ,"main_link":main_link, "post":"submitted"} });
         });
      });

	 });//end of $.get function
	}
	 myfunction();
    };

$(document).ready(main);