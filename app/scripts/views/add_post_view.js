
(function(){

  App.Views.AddPost = Parse.View.extend({

    events: {
      'submit #addpost' : 'addpost'
    },

    initialize: function(){
      this.render();

      $('#blogposts').html();

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

    }


  });

}());
