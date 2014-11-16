//this is Draft Views By User


$( document ).ready(function(){

App.Views.ListBlogs = Parse.View.extend ({

  tagName: 'ul',
  className: 'Show',

    events: {
      'click #poster' : 'makePublic',
    },

    template: _.template($('#mainblog').html()),

  initialize: function(options) {

    this.options = options;

    this.collection.off();
    this.collection.on('sync', this.render, this);
    this.collection.on('destroy', this.render, this);

    this.userQuery();

    $('#listBlogs').html(this.$el);
    console.log(this.collection);
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

     this.collection.each(function (s) {
        if (s.attributes.draft === true) {
        self.$el.append(self.template(s.toJSON()));

        }

      });

      if (this.options.showHeader) {
        $('#blogposts h1 a').html('My Drafts');
      } else {
        $('#blogposts h1 a').html('All Posts');
      }

      return this;
    },

});

}());
