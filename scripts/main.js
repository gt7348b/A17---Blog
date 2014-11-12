// This sets up global apps

          window.App = {};
          App.Models = {};
          App.Collections = {};
          App.Views = {};
          App.Routers = {};


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

  App.Collections.Blogposts = Parse.Collection.extend({

    model: App.Models.Post,

  });


}());


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
        //add user
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

(function(){



}());


(function(){

App.Views.ListBlogs = Parse.View.extend ({

  tagName: 'ul',
  className: 'Show',

    events: {},

    template: _.template($('#mainblog').html()),

  initialize: function(options) {

    this.options = options;

    this.render();

    this.collection.off();
    this.collection.on('sync', this.render, this);

    $('#listBlogs').html(this.$el);

  },

  render: function(){

    var self = this;

    //clears our element
    this.$el.empty();

      this.collection.each(function (s) {
        console.log(self.template);
        self.$el.append(self.template(s.toJSON()));
      })

      return this;
  },


});


}());


(function(){

App.Views.Login = Parse.View.extend ({

  className: "LogIn",

  events: {

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
        //App.router.navigate('', {trigger:true});
      },

      error: function(user, error) {
        alert("Error");
      }

    });

  }

});

}());


(function(){

App.Views.SignUp = Parse.View.extend({

  events: {
    "submit #newuser" : "signupUser",
  },

  template: $("#adduser").html(),

  initialize: function() {
    this.render();

    $("#signed").html(this.$el);
  },


  render: function() {
    this.$el.html(this.template);
  },

  signupUser: function(e) {

    e.preventDefault();

    var username = $('#newusername').val();
    var password = $('#newpassword').val();
    console.log(username);

    var user = new Parse.user();
      user.set('username', username);
      user.set('password', password);

    user.signUp (null, {
      success: function(user) {
      },
      error: function(user, error){
        alert("Error Signup");
      }

    });

  }

});

}());


(function(){

  App.Routers.approuter = Parse.Router.extend({

    initialize: function () {
      // Light the Fire

    },

    routes: {
      '' : 'home',
      'add' : 'addPost',
    },

    home: function(){
      new App.Views.Login();
      new App.Views.SignUp();
      new App.Views.ListBlogs({ collection: App.blog_posts});
    },

    addPost: function(){
  //    console.log('On-on');

      new App.Views.AddPost();

    }


  });

}());

//Initialize Parse

Parse.initialize("wF5Pd5fI6w6c5jbKHdEM9qKg3lLaQAw7phwYLnz2", "aKAGgKJ26LBBhqksgQzCW4iFvTZHyEL1125Gwznr");

//Work

(function(){

    //Create blog posts

    App.blog_posts = new App.Collections.Blogposts();

      console.log(App.blog_posts);

      App.blog_posts.fetch().done(function() {

      App.router = new App.Routers.approuter();

      console.log('on-on');
      Parse.history.start();
    })


}());
