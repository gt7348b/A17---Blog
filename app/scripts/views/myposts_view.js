
(function(){

App.Views.MyBlogs = Parse.View.extend ({

  tagName: 'ul',
  className: 'myPost',

    events: {

    },

    template: _.template($('#myposts').html()),

  initialize: function(options) {

    this.options = options;

    this.collection.off();
    this.collection.on('sync', this.render, this);

    this.userQuery();

    $('#listBlogs').html(this.$el);

  },

  userQuery: function(){

    var self= this;

    var user_name = new Parse.Query(App.Models.Post);

    user_name.equalTo('user', App.user.attributes.username);

    user_name.find({

      success: function(results){

        self.collection.models = results;

        self.render();
      }

    });

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
