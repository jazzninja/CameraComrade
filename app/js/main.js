var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=0AmYzu_s7QHsmdE5OcDE1SENpT1g2R2JEX2tnZ3ZIWHc&output=html';
        
      /* 
        You need to declare the tabletop instance separately, then feed it into the model/collection
        You *must* specify wait: true so that it doesn't try to fetch when you initialize
      */
var storage = Tabletop.init( { key: public_spreadsheet_url,
                                wait: true } )

      /*
       Need to specify that you'd like to sync using Backbone.tabletopSync
       Can specify tabletop attributes, or you can do it on the collection
      */
var Cat = Backbone.Model.extend({
  idAttribute: 'Name',
  tabletop: {
    instance: storage,
    sheet: 'Cats'
  },
  sync: Backbone.tabletopSync
})

      /*
       Need to specify that you'd like to sync using Backbone.tabletopSync
       Need to specify a tabletop key and sheet
      */
var CatCollection = Backbone.Collection.extend({
          // Reference to this collection's model.
    model: Cat,
    tabletop: {
      instance: storage,
      sheet: 'Cats'
    },
    sync: Backbone.tabletopSync
});

var CatView = Backbone.View.extend({
    tagname: 'div',
    template: _.template($('#cat-template').html()),

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
})

$(document).ready( function() {
  var cats = new CatCollection();
  cats.fetch({ success: showInfo });
});
      
function showInfo(cats) {
  var henry_view = new CatView({ model: cats.get('Henry') });

  $("#content").append( henry_view.render().el );

  var bosco_view = new CatView({ model: cats.get('Bosco') });

  $("#content").append( bosco_view.render().el );
        
        /*
          NOT WORKING, NOT SURE WHY.
          
          Fetching on models works as long as you've specified a sheet
          and an idAttribute for the Backbone.Model (you can always
          use rowNumber, it comes baked in to Tabletop)
        */
  thomas = new Cat({name: 'Thomas'})
  thomas.fetch();

  var thomas_view = new CatView({ model: thomas });
  $("#content").append( thomas_view.render().el );
}