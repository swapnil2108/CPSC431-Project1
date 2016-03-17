var main = function() {
    "use strict";
    function myfunction() {
        $.get("http://localhost:3000/reddit", function(getData){
			  getData.forEach(function(reddit) {
             
			 var postsList ="<div class ='postContent'>"
							+"<div class = 'votes'>"
			                +"<img class='voteUpButton' src='image/up.png'>"+"<br>"
                            +"<strong id ="+reddit.id+" class='votesNum'>"+"</strong>"+"<br>"
                            +"<img class='voteDownButton' src='image/down.png'>"
							+"</div>"
							+"<div class ='Content-List'>"
							+"<p>"+"<a href="+JSON.stringify(reddit.main_link)+">"+reddit.link_title+"</a>"
							+"</p>"
							+"</div>";
              
			  $(postsList).appendTo('div.postsContainer');
			  $("#"+reddit.id+"").text(reddit.likes);
      });
	 });
	}
	 myfunction();
    };

$(document).ready(main);
