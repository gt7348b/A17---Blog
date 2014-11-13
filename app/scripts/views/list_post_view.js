
(function(){

App.Views.ListBlogs = Parse.View.extend ({

  tagName: 'ul',
  className: 'Show',

    events: {
      'click #addComment' : 'addComment',
    },

    template: _.template($('#mainblog').html()),

  initialize: function(options) {

    this.options = options;

    this.render();

    this.collection.off();
    this.collection.on('sync', this.render, this);
    this.collection.on('destroy', this.render, this);

    $('#listBlogs').html(this.$el);

  },

  render: function(){

    var self = this;

    //clears our element
    this.$el.empty();

      this.collection.each(function (s) {
        self.$el.append(self.template(s.toJSON()));
      })

      return this;

  },

  deleteSong: function(event){
        event.preventDefault();

        var id = $(event.target).attr('id');

        console.log(id);

        var eliminate = App.blog_posts.get(id);

        console.log(eliminate);

        eliminate.destroy();

        //Return to main page
        App.router.navigate('', {trigger: true});

      }


});


}());
