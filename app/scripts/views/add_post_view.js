
$( document ).ready(function(){

  App.Views.AddPost = Parse.View.extend({

    events: {
      'click #postIt' : 'addpublic',
      'click #draftIt' : 'draftpost',
    },

    initialize: function(){
      this.render();

      $('#listBlogs').html(this.$el);

    },

    render: function(){
      this.$el.html($('#addpost').html());

      if (this.options.showHeader) {
        $('#blogposts h1 a').html('Add New Post');
      } else {
        $('#blogposts h1 a').html('All Posts');
      }

    },

    addpost: function(draft){

      console.log("hohoho");

      var post = new App.Models.Post({
        title: $('#input_title').val(),
        content: $('#blogcontent').val(),
        tags: $('#category').val(),
        user: App.user.attributes.username,
        draft: draft,
        //add time and date stamp
      });

      //Set Control
      var postACL = new Parse.ACL();

      postACL.setPublicReadAccess(true);
      postACL.setWriteAccess(App.user, true);

      console.log('Its a dream');

      post.save(null, {
      success: function () {
        App.blog_posts.add(post);
      }
    });

    //clear my form
    $("#newpost")[0].reset();

  },

    draftpost: function(e) {
      e.preventDefault();
      this.addpost(true);
      App.router.navigate('draft', {trigger: true});
    },

    addpublic: function(e) {
      e.preventDefault();
      this.addpost(false);
      App.router.navigate('', {trigger: true});
    }

  });

}());
