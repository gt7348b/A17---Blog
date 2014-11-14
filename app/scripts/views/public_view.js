
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
       console.log(model);
      return -parseInt(model.createdAt)

    });

    console.log(sort_collection);

      _.each(sort_collection, function (s) {
          if (s.attributes.draft === false) {
        self.$el.append(self.template(s.toJSON()));
      }

      })

      return this;

  },

  showLogin: function(event){
        event.preventDefault();

        $('.login').show();

      },

});


}());
