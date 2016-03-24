var main = function() {
    "use strict";
	
    function myfunction() {
        $.get("http://localhost:3000/reddit", function(getData){
        getData.forEach(function(reddit) {
       var imgId=reddit.id;
			 var postsList ="<div class ='postContent'>"
							+"<div class = 'votes'>"
			                +"<img  id="+imgId+" class='voteUpButton' src='image/up.png'>"+"<br>"
                            +"<strong id ="+reddit.id+" class='votesNum'>"+reddit.likes+"</strong>"+"<br>"
                            +"<img  id="+imgId+" class='voteDownButton' src='image/down.png'>"
							+"</div>"
							+"<div class ='Content-List'>"
							+"<p>"+"<a href="+JSON.stringify(reddit.main_link)+">"+reddit.link_title+"</a>"
							+"</p>"
							+"</div>"
							+"</div>";
			  $(postsList).appendTo('div.postsContainer');

			 // $("#"+reddit.id+".votesNum").text(reddit.likes);
			 // $("#postform")[0].reset(); 
      });//end of ForEach loop

      //Vote up event:
      $("img.voteUpButton").bind("click", function(){
           var user=$("#login").val();
            if(user=="Login/Register"){
                $('#modal1').openModal();
            }
          else{
           var $imgId= this.id, main_link, link_title, image_link ,result=$("#"+this.id+".votesNum").text();
           result++;// result is the number of likes after increasing or decreasing
           $("#"+this.id+".votesNum").text(result);//updating the html with the new "Likes" value

           //get request to get other reddit.json elements by using only the ID:
             main_link=getData[this.id -1].main_link;
             link_title=getData[this.id -1].link_title;
             image_link=getData[this.id -1].image_link;
             $.ajax({type:"PUT", url:"http://localhost:3000/reddit/"+ $imgId, data:{"id":$imgId,"image_link":image_link, "likes":result,"link_title":link_title ,"main_link":main_link, "post":"submitted"} });
      }
          });
      

      //Vote down event:
      $("img.voteDownButton").bind("click",function(){
          var user=$("#login").val();
            if(user=="Login/Register"){
                $('#modal1').openModal();
            }
          else{
          var $imgId= this.id, main_link, link_title, image_link, result=$("#"+this.id+".votesNum").text();
		  result--;
          // result is the number of likes after increasing or decreasing
          $("#"+this.id+".votesNum").text(result);//updating the html with the new "Likes" value

          //get request to get other reddit.json elements by using only the ID:
            main_link=getData[this.id -1].main_link;
            link_title=getData[this.id -1].link_title;
            image_link=getData[this.id -1].image_link;
            $.ajax({type:"PUT", url:"http://localhost:3000/reddit/"+ $imgId, data:{"id":$imgId,"image_link":image_link, "likes":result,"link_title":link_title ,"main_link":main_link, "post":"submitted"} });
          }
          });

	 });//end of $.get function
	}
	function search(){
        $('#search').keyup(function(){
            var searchField = $('#search').val();
            var regex = new RegExp(searchField, "i");
			console.log(regex);
			
		    var postsList ="<div class ='postContent'>"
            var count = 1;
            $.get("http://localhost:3000/reddit", function(data) {
              $.each(data, function(key, reddit){
				  var imgId=reddit.id;
                if ((reddit.link_title.search(regex) != -1) || (reddit.main_link.search(regex) != -1)) {
				
                  
				   postsList+="<div class = 'votes'>"
			                +"<img  id="+imgId+" class='voteUpButton' src='image/up.png'>"+"<br>"
                            +"<strong id ="+reddit.id+" class='votesNum'>"+reddit.likes+"</strong>"+"<br>"
                            +"<img  id="+imgId+" class='voteDownButton' src='image/down.png'>"
							+"</div>"
							+"<div class ='Content-List'>"
							+"<p>"+"<a href="+JSON.stringify(reddit.main_link)+">"+reddit.link_title+"</a>"
							+"</p>"
							+"</div>"
							+"</div>";
                  if(count>=1){
                    postsList += "<div class ='postContent'>"
                  }
                  count++;
                }
              });
              postsList += '</div>';
			  $('.postsContainer').empty();
              $('.postsContainer').html(postsList);
			  if (searchField===""){$('.postsContainer').empty();myfunction();}
            });
           			
        });
      }
    //login
	function login(){
          $('#modal1').on('click',function( event ) {
    event.preventDefault();
});
		$("#log").on("click", function() {
    var username = document.getElementById("username").value;
     var pwd = document.getElementById("password").value;  
        if (username===""){
            alert("please enter your username");
        }
        else if(pwd===""){
            alert("please enter your password");
        }
        else{
            var j = JSON.parse('{"name":"' + username + '","password":"' + pwd + '"}');
    $.ajax({
        url: "http://localhost:3000/users",
        type: "GET",
        dataType: "json",
        data: j,
        success: function(result) {
            console.log(result.length);
            if(result.length===0)
                {
                    alert("login failed");
                }
            else{
                Materialize.toast('Login successfully', 3000, 'rounded');
                $('#modal1').closeModal();
                document.getElementById("login").value="Hi "+username+" !!";
                document.getElementById("login").setAttribute("class","btn disabled");
            }
        }, 
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
            
     }
    });
}
    //Register
    function register(){
    $('#modal1').on('click',function( event ) {
    event.preventDefault();
});
    $("#reg").on("click", function(){
        var username=document.getElementById("reguser").value;
        var pass=document.getElementById("regpass").value;
        var confirm=document.getElementById("regemail").value;
        if(username==="" || pass==="" || confirm===""){
        alert("please enter the values !!!!");
        }
        else{
            var j = JSON.parse('{"name":"' + username + '","password":"' + pass + '"}');
            $.ajax({
        type: "POST",
        data:j,
        url:  "http://localhost:3000/users",
        dataType: "json",
        success: function(){
            Materialize.toast('Registered successfully', 3000, 'rounded');
            document.getElementById("reguser").value="";
            document.getElementById("regpass").value="";
            document.getElementById("confirmpass").value="";
            $('#modal1').closeModal();
            
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
  });
            
        }
    });
}
    //Signout
    function signout(){ 
        $("#signout").on("click",function(){
           var user=$("#login").val();
            if(user=="Login/Register"){
                alert("please login first");
            }
            else{
                var user1=document.getElementById("username").value;
                Materialize.toast('See you !! '+user1+'', 3000, 'rounded');
                document.getElementById("login").value="Login/Register";
                document.getElementById("login").setAttribute("class","btn modal-trigger");
            }
        });
    };
	 myfunction();
	 search();
	 login();
     register();
     signout();

$("#login").on("click",function(){
   $('#modal1').openModal();
   
});

};
$(document).ready(main);