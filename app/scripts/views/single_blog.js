(function () {

  App.Views.SingleBlog = Parse.View.extend({

    tagName: 'ul',
    className: 'BlogSingle',

    events: {
      'submit #formComment' : 'commentBlog',
      'click #home' : 'returnMain',
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
          console.log(results);
          _.each(results, function(comment) {
            $('ul.commented').append(commentTemplate(comment.toJSON()));
          })
        }
      })

    },

    commentBlog: function (e) {
      e.preventDefault();

      var commented = new App.Models.Comment({

        comments: $('#comments').val(),
        parent: this.options.blogs

      });

      commented.save(null, {
        success: function () {
          console.log('Comment has been added');
        //  App.router.navigate('', {trigger: true});
        }
     });

    },

    returnMain: function(e){
      App.router.navigate('', {trigger: true});
    },


  });

}());
