
(function(){

  App.Views.AddPost = Parse.View.extend({

    events: {
      'submit #newpost' : 'addpost'
    },

    initialize: function(){
      this.render();

      $('.addedPost').html(this.$el);

    },

    render: function(){
      this.$el.html($('#addpost').html());

    },

    addpost: function(e){
      e.preventDefault();
      console.log("hohoho");

      var post = new App.Models.Post({
        title: $('#input_title').val(),
        content: $('#blogcontent').val(),
        tags: $('#newtags').val(),
        user: App.user.attributes.username,
        //add time and date stamp
      });

      console.log(input_title);

      post.save(null, {
      success: function () {
        App.blog_posts.add(post);
      }
    });

    //clear my form
    $("#newpost")[0].reset();

    }


  });

}());
