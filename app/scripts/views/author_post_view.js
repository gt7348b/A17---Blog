//this is Draft Views By User
(function(){

App.Views.AuthorPost = Parse.View.extend ({

  tagName: 'ul',
  className: 'Author',

    events: {

    },

    template: _.template($('#publicblog').html()),

  initialize: function(options) {

    this.options = options;

    this.render();

    $('#listBlogs').html(this.$el);
    console.log(this.collection);
  },


  render: function(){

    var self = this;

    //clears our element
    this.$el.empty();

      _.each(this.collection, function (s) {

        if (s.attributes.draft === false){

          self.$el.append(self.template(s.toJSON()));
        }

      })

      if (this.options.showHeader) {
        $('#blogposts h1 a').html('Blogs By Author');
      } else {
        $('#blogposts h1 a').html('All Posts');
      }


      return this;

  },

});


}());
