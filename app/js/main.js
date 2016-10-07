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
}




//document.getElementById("button-showinfo").onclick = showInfo();
/*document.getElementById("button-show-info").on("click", showInfo());*/




