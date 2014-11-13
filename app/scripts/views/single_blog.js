(function () {

  App.Views.SingleBlog = Parse.View.extend({

    tagName: 'ul',
    className: 'BlogSingle',

    events: {
      'submit #BlogOne' : 'updateBlog',
    },

    template: _.template($('#singleBlog').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      // Get our Element On Our Page
      $('#listBlogs').html(this.$el);
    },

    render: function () {
      this.$el.empty();
      this.$el.html(this.template(this.options.blogs.toJSON()));

    },

    updateBlog: function (e) {
      e.preventDefault();

      // Update our Model Instance
      this.options.blogs.set({
        title: $("#update_title").val(),
        content: $("#update_content").val(),
        tags: $("#update_tags").val(),
      });

      // Save Instance
      this.options.blogs.save();

      // Return to home page
      App.router.navigate('', {trigger: true});

    },

  });

}());
