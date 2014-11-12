// This sets up global apps

          window.App = {};
          App.Models = {};
          App.Collections = {};
          App.Views = {};
          App.Routers = {};

(function(){

  App.Collections.Blogposts = Parse.Collection.extend({

    model: App.Models.Post,

  });


}());


(function(){

  App.Models.Post = Parse.Object.extend({

    className: 'blogPost',

    defaults: {
      title: '',
      content: '',
      tags: '',
      user: '',
      submitted: ''
    },

    idAttribute: 'objectID',

    initialize: function(){
      console.log("Lucky?");

    }

  });


}());


(function(){

  App.Routers.approuter = Parse.Router.extend({

    initialize: function () {
      // Light the Fire
      Parse.history.start();
    },

    routes: {
      '' : 'home',
      'add' : 'addPost',
    },

    home: function(){
      new App.Views.Login();
    },

    addPost: function(){
      console.log('On-on');

      new App.Views.AddPost();

    }


  });

}());


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

(function(){



}());


(function(){



}());


(function(){

App.Views.Login = Parse.View.extend ({

  className:"LogIn",

  event: {

    "submit #login" : "loginUser",

  },

  template: $("#usersignin").html(),

  initialize: function() {
    this.render();

    $('#logged').html(this.$el);
  },

  render: function() {

    this.$el.html(this.template);
  },

  loginUser: function(e) {

    e.preventDefault();
    
    var userName = $('#username').val();
    var password = $('#password').val();

    Parse.User.logIn(username, password, {
      success: function(user){
        App.updateUser();
        App.router.navigate('', {trigger:true});
      },

      error: function(user, error) {
        alert("Error");
      }

    });

  }

});

}());


(function(){



}());

//Initialize Parse

Parse.initialize("wF5Pd5fI6w6c5jbKHdEM9qKg3lLaQAw7phwYLnz2", "aKAGgKJ26LBBhqksgQzCW4iFvTZHyEL1125Gwznr");

//Work

(function(){

    //Create blog posts

    App.blog_posts = new App.Collections.Blogposts();

      console.log('Are you?');

    //App.blog_posts.fetch().done(function(){

      //console.log(App.blog_posts);

      App.router = new App.Routers.approuter();
      console.log('on-on');

    //})


}());
