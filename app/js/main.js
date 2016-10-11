window.onload = function() { init();};

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1jspbTfijbvU7FUhICp6rXZfOXs6avxpBifLdxoYXj-E/pubhtml';

function init() {
	document.getElementById('splash').style.display = 'block'; 
}

function showInfo(data, tabletop) {
  	var source   = $("#cam-template").html();
  	var template = Handlebars.compile(source);

    $.each( tabletop.sheets("DucaCamChart").all(), function(i, cam) {
    	var html = template(cam);
        $("#content").append(html);
    });
}

function SplashBeGone() { 
  $('#splash').fadeOut(600);
  Tabletop.init( { key: public_spreadsheet_url,
  					callback: showInfo,
  					simpleSheet: true} );
};


$("#search-btn").click(function(){
	var hitTemplate = Handlebars.compile($("#cam-template").html());

  	$("#content").empty();
  	$.getJSON($("#tableFilter").val() + "&wt=json&json.wrf=?&indent=true", function(result){
    	for (var i = 0; i < result.response.docs.length; i++) {
      	$("#content").append(hitTemplate({title: result.response.docs[i].title, text: result.response.docs[i].text}));
    	}
  	});
});

//document.getElementById("button-showinfo").onclick = showInfo();
/*document.getElementById("button-show-info").on("click", showInfo());*/




