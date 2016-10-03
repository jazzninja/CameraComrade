window.onload = function() { init();};

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1jspbTfijbvU7FUhICp6rXZfOXs6avxpBifLdxoYXj-E/pubhtml';

function init() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo } );
}

function showInfo(data, tabletop) {
  	var source   = $("#cam-template").html();
  	var template = Handlebars.compile(source);

    $.each( tabletop.sheets("DucaCamChart").all(), function(i, cam) {
    	var html = template(cam);
        $("#content").append(html);
    });


}

