
(function(){

App.Views.PublicBlogs = Parse.View.extend ({

  tagName: 'ul',
  className: 'Public',

    events: {

    },

    template: _.template($('#publicblog').html()),

  initialize: function(options) {

    this.options = options;

    this.collection.off();
    this.collection.on('sync', this.render, this);

    this.render();

    $('#listBlogs').html(this.$el);

  },

  render: function(){

    var self = this;

    //clears our element
    this.$el.empty();

    var sort_collection = this.collection;

    sort_collection = this.collection.sortBy (function (model){

      return -parseInt(model.createdAt)

    });

      _.each(sort_collection, function (s) {
          if (s.attributes.draft === false) {
        self.$el.append(self.template(s.toJSON()));
      }

      })

      return this;

  },

});


}());

/*         // Sorting On The Fly
    if (this.options.sort != undefined) {
      // Setting up a localized collection to sort by our sort param
      var list_collection = this.collection.sortBy( function (model) {
        return model.get(self.options.sort);
      });
      _.each(list_collection, function (s) {
         if (s.attributes.draft === false) {
        self.$el.append(self.template(s.toJSON()));
       }
      })
    } else {
      // Sort from our default
      this.collection.sort();
      this.collection.each(function (s) {
        if (s.attributes.draft === false) {
        self.$el.append(self.template(s.toJSON()));
        }

      });
    } */
