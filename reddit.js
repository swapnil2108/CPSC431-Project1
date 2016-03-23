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
							+"</div>";
			  $(postsList).appendTo('div.postsContainer');

			 // $("#"+reddit.id+".votesNum").text(reddit.likes);
			 // $("#postform")[0].reset(); 
      });//end of ForEach loop

      //Vote up event:
      $("img.voteUpButton").one("click", function(){
           var $imgId= this.id, main_link, link_title, image_link ,result=$("#"+this.id+".votesNum").text();
           result++;// result is the number of likes after increasing or decreasing
           $("#"+this.id+".votesNum").text(result);//updating the html with the new "Likes" value

           //get request to get other reddit.json elements by using only the ID:
             main_link=getData[this.id -1].main_link;
             link_title=getData[this.id -1].link_title;
             image_link=getData[this.id -1].image_link;
             $.ajax({type:"PUT", url:"http://localhost:3000/reddit/"+ $imgId, data:{"id":$imgId,"image_link":image_link, "likes":result,"link_title":link_title ,"main_link":main_link, "post":"submitted"} });
      });

      //Vote down event:
      $("img.voteDownButton").one("click",function(){
          var $imgId= this.id, main_link, link_title, image_link, result=$("#"+this.id+".votesNum").text();
		  result--;
          // result is the number of likes after increasing or decreasing
          $("#"+this.id+".votesNum").text(result);//updating the html with the new "Likes" value

          //get request to get other reddit.json elements by using only the ID:
            main_link=getData[this.id -1].main_link;
            link_title=getData[this.id -1].link_title;
            image_link=getData[this.id -1].image_link;
            $.ajax({type:"PUT", url:"http://localhost:3000/reddit/"+ $imgId, data:{"id":$imgId,"image_link":image_link, "likes":result,"link_title":link_title ,"main_link":main_link, "post":"submitted"} });
      });

	 });//end of $.get function
	}
	
	function login(){
		$("#login").on("click", function() {
    var username = document.getElementById("username").value;
     var pwd = document.getElementById("password").value;  
     console.log(username);
        if (username===""){
            alert("please enter your username");
        }
        else if(pwd===""){
            alert("please enter your password");
        }
        else{
            var j = JSON.parse('{"name":"' + username + '","password":"' + pwd + '"}');
    $.ajax({
        url: "http://localhost:3004/users",
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
                alert("login Successful");
            }
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
        }
    });
    $("#Register").on("click", function(){
        var username=document.getElementById("reguser").value;
        var pass=document.getElementById("regpass").value;
        var confirm=document.getElementById("confirmpass").value;
        if(username==="" || pass==="" || confirm===""){
        alert("please enter the values !!!!");
        }
        else if(pass!==confirm){
            alert("password not matching");
        }
        else{
            var j = JSON.parse('{"name":"' + username + '","password":"' + pass + '"}');
            $.ajax({
        type: "POST",
        data:j,
        url:  "http://localhost:3004/users",
        dataType: "json",
        success: function(){
            alert("Registered successfully");
            document.getElementById("reguser").value="";
            document.getElementById("regpass").value="";
            document.getElementById("confirmpass").value="";
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
  });
        }
    });
}
		jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
    });
    $("#postform").validate({
        rules: {
            field: {
                required: true,
                url: true
            }
        }
    });
    var form = $("#postform");
    form.validate();//End- post form validation
    //Start- JQuery code for post fields
    $("#postbutton").click(function(element) {
        var check = $("#checkbox").is(':checked');
        if (check === true) {
            if ($("#input1").val() === "" || $("#input2").val() == "" || $("#input3").val() == "") {
                element.preventDefault();
                setTimeout(fade_out, 5000);
                $("#spanbutton").css({
                    "visibility": "visible",
                    "display": "inline"
                }).text("Enter input");

                function fade_out() {
                    $("#spanbutton").fadeOut().empty();
                }
            } else {
                if (form.valid() === true) {

                    $("#spanbutton").css({
                        "visibility": "visible"
                    }).text("");
                    $.post("http://localhost:3000/reddit", {
                        "link_title": $("#input1").val(),
                        "main_link": $("#input2").val(),
                        "image_link": $("#input3").val(),
                        "likes": 0,
                        "post": "submitted"
                    }, function() {
                        myfunction();

                    });

                }

            }
        } else {
            element.preventDefault();
            setTimeout(fade_out, 5000);

            function fade_out() {
                $("#spanbutton").fadeOut().empty();
            }
            $("#spanbutton").css({
                "visibility": "visible",
                "display": "inline"
            }).text("Log in to post");
        }
    });
	
	 myfunction();
	 login();
    };

$(document).ready(main);