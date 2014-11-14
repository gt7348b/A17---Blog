
(function(){

  App.Views.AddPost = Parse.View.extend({

    events: {
      'submit #newpost' : 'addpost',
    },

    initialize: function(){
      this.render();

      $('#listBlogs').html(this.$el);

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

      //Set Control
      post.setACL(new Parse.ACL(App.user));

      var postACL = new Parse.ACL(Parse.User.current());

      postACL.setPublicReadAccess(true);

      console.log(input_title);

      post.save(null, {
      success: function () {
        App.blog_posts.add(post);
      }
    });

    //clear my form
    $("#newpost")[0].reset();

    App.router.navigate('', {trigger: true});
  },


  });

}());
