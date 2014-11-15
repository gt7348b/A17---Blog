(function () {

  App.Views.EditBlog = Parse.View.extend({

    tagName: 'ul',
    className: 'EditBlog',

    events: {
      'submit #BlogOne' : 'updateBlog',
      'click #delete' : 'deleteBlog',
      'click #postBtn' : 'postDraft',
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
      console.log(this);
    },

    updateBlog: function (e) {
      e.preventDefault();

      // Update our Model Instance
      this.options.blogs.set({
        title: $("#update_title").val(),
        content: $("#update_content").val(),
        tags: $("#update_category").val(),
      });

      // Save Instance
      this.options.blogs.save();

      // Return to home page
      App.router.navigate('', {trigger: true});

    },

      deleteBlog: function (e) {
      e.preventDefault();

      // Remove Holiday
      this.options.blogs.destroy();

      // Return to home page
      App.router.navigate('', {trigger: true});

    },

    postDraft: function(e) {
      e.preventDefault();

      // Update our Model Instance
      this.options.blogs.set({
        title: $("#update_title").val(),
        content: $("#update_content").val(),
        tags: $("#update_category").val(),
        draft: false,
      });


      // Save Instance
      this.options.blogs.save();

      // Return to home page
      App.router.navigate('', {trigger: true});

    },

  });

}());
