
(function(){

  App.Views.AddPost = Parse.View.extend({

    events: {
      'click #addBtn' : 'addpost'
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

      var post = new App.Models.Post({
        title: $('#newusername').val(),
        content: $('#blogcontent').val(),
        tags: $('newtags').val(),
        //add user
        //add time and date stamp
      });

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
