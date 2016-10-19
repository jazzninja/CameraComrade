

$(document).ready(function(){

	var public_spreadsheet_url = 'd/1jspbTfijbvU7FUhICp6rXZfOXs6avxpBifLdxoYXj-E/pubhtml';

	var storage = Tabletop.init( { 	key: public_spreadsheet_url,
	                            	wait: true } );

	function showInfo(cameras) {
		var cameraView;

		cameras.each(function(model) {
			camera_view = new CameraView({
				model: model
			});
			$("#content").append(camera_view.render().el);
		});
	}

	var CameraView = Backbone.View.extend({
		tagname: 'div',
		template: _.template($('#cam-template').html()),

		render: function() {
		    $(this.el).html(this.template(this.model.toJSON()));
		    return this;
		}
	});

	var Cam = Backbone.Model.extend({
		idAttribute: 'List_Num',
		tabletop: {
		    instance: storage,
		    sheet: 'DucaCamChart'
		},
		sync: Backbone.tabletopSync
	});

	var CameraCollection = Backbone.Collection.extend({
	    // Reference to this collection's model.
		model: Cam,
		tabletop: {
		    instance: storage,
		    sheet: 'DucaCamChart'
		},
		sync: Backbone.tabletopSync
	});

	//alert("Its aliiiive!!!!");
	var cameras = new CameraCollection();
	cameras.fetch({ success: showInfo });

	var options = {
	  valueNames: [ 'make' , 'model' , 'type' , 'codec' , 'resolution' , 'frame_rate' , 'data_rate' ]
	};

	var cameraList = new List('camp-template', options);

});



















