$( document ).ready(function () {

  App.Views.SingleBlog = Parse.View.extend({

    tagName: 'ul',
    className: 'BlogSingle',

    events: {
      'submit #formComment' : 'commentBlog',
    },

    template: _.template($('#ReadTemp').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      // Get our Element On Our Page
      $('#listBlogs').html(this.$el);
    },

    render: function () {
      this.$el.empty();
      this.$el.html(this.template(this.options.blogs.toJSON()));

      var commentTemplate = _.template($('#CommentTemp').html());
      var comment_query = new Parse.Query(App.Models.Comment);

      comment_query.equalTo('parent', this.options.blogs);

      this.$el.append('<h2>Comments</h2><ul class="commented"></ul>');

      comment_query.find({
        success: function (results) {
          _.each(results, function(comment) {
            $('ul.commented').append(commentTemplate(comment.toJSON()));
          })
        }
      })

    if (this.options.showHeader) {
      $('#blogposts h1 a').html('');
    } else {
      $('#blogposts h1 a').html('All Posts');
    }


    },

    commentBlog: function (e) {
      e.preventDefault();

      var commented = new App.Models.Comment({

        comments: $('#comments').val(),
        parent: this.options.blogs

      });

      commented.save(null, {
        success: function () {

        }
     });

    },

  });

}());
