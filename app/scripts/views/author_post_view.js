//this is Draft Views By User
(function(){

App.Views.AuthorPost = Parse.View.extend ({

  tagName: 'ul',
  className: 'Author',

    events: {

    },

    template: _.template($('#mainblog').html()),

  initialize: function(options) {

    this.options = options;

    //this.collection.off();
    //this.collection.on('sync', this.render, this);

    this.authorQuery();

    $('#listBlogs').html(this.$el);
    console.log(this.collection);
  },

  authorQuery: function(){

    var self= this;

    var author = new Parse.Query(App.Models.Post);

    author.equalTo('user', App.user.attributes.username);

    author.find({

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

        console.log(s);

        if (s.attributes.draft === false){

          self.$el.append(self.template(s.toJSON()));
        }

      })

      return this;

  },

});


}());
