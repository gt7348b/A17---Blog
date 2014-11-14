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
      submitted: '',
      comments: '',
    },

    idAttribute: 'objectID',

    initialize: function(){
      //console.log("Lucky?");

    }

  });


}());

(function () {

  App.Models.Comment = Parse.Object.extend({

    className: 'Comment',

    defaults: {
      comments: "",
    },

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

(function () {

  App.Views.EditBlog = Parse.View.extend({

    tagName: 'ul',
    className: 'EditBlog',

    events: {
      'submit #BlogOne' : 'updateBlog',
      'click #delete' : 'deleteBlog',
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

    },

    updateBlog: function (e) {
      e.preventDefault();

      // Update our Model Instance
      this.options.blogs.set({
        title: $("#update_title").val(),
        content: $("#update_content").val(),
        tags: $("#update_tags").val(),
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

  });

}());


(function(){

App.Views.ListBlogs = Parse.View.extend ({

  tagName: 'ul',
  className: 'Show',

    events: {

    },

    template: _.template($('#mainblog').html()),

  initialize: function(options) {

    this.options = options;

    this.render();

    this.collection.off();
    this.collection.on('sync', this.render, this);
    this.collection.on('destroy', this.render, this);

    $('#listBlogs').html(this.$el);

  },

  render: function(){

    var self = this;

    //clears our element
    this.$el.empty();

      this.collection.each(function (s) {
        self.$el.append(self.template(s.toJSON()));
      })

      return this;

  },

  showLogin: function(event){
        event.preventDefault();

        $('.login').show();

      },

  deleteSong: function(event){
        event.preventDefault();

        var id = $(event.target).attr('id');

        console.log(id);

        var eliminate = App.blog_posts.get(id);

        console.log(eliminate);

        eliminate.destroy();

        //Return to main page
        App.router.navigate('', {trigger: true});

      }


});


}());

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
      console.log(this);
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


(function(){

App.Views.Login = Parse.View.extend ({

  className: "LogIn",

  events: {

    "submit #login" : "loginUser",
  //  "submit #logout" : "logoutUser",
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

    var username = $('#username').val();
    var password = $('#password').val();

    Parse.User.logIn(username, password, {
      success: function(user){
        App.user = user;
        console.log(App.user);
        App.updateUser();
        //App.router.navigate('', {trigger:true});
      },

      error: function(user, error) {
        alert("Error");
      }

    });

    //clear my form
    $("#login")[0].reset();

  },

//  logoutUser: function(e) {
  //  e.preventDefault();

    //Parse.User.logOut();
    //console.log(App.user);

  //}
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

    $("#newUser").html(this.$el);
  },


  render: function() {
    this.$el.html(this.template);
  },

  signupUser: function(e) {

    e.preventDefault();

    var username = $('#newusername').val();
    var password = $('#newpassword').val();
    var ckpassword = $('#confirmpword').val();
    console.log(username);
    console.log(password);

    //Check if passwords match and add new user if true

    if ( password === ckpassword ){

          var user = new Parse.User();
          user.set('username', username);
          user.set('password', password);

        user.signUp (null, {
          success: function(user) {
          },
          error: function(user, error){
            alert("Error Signup");
          }
        });
      } else {
          window.alert('Passwords Do Not Match');
      }

    //Clear form

    $("#newuser")[0].reset();
  }

});

}());


(function(){

  App.Routers.approuter = Parse.Router.extend({

    initialize: function () {

    //Parse.history.start();

    },

    routes: {
      '' : 'home',
      'start': 'enterSite',
      'add' : 'addPost',
      'edit/:id' : 'editBlog',
      'comment/:id' : 'commentBlog'
    },

    home: function(){
    //  new App.Views.Login();
    //  new App.Views.SignUp();
      new App.Views.ListBlogs({ collection: App.blog_posts});
      $('.logIn').hide();

    },

    enterSite: function(){
      new App.Views.Login();
      new App.Views.SignUp();
      $('.logIn').show();
    },

    addPost: function(){
      new App.Views.AddPost();
      $('.logIn').hide();
    },

    editBlog: function(id){
      var e = App.blog_posts.get(id);
     new App.Views.EditBlog({blogs: e});
    },

    commentBlog: function(id){
      var c = App.blog_posts.get(id);
     new App.Views.SingleBlog({blogs: c});
    },

  });

}());

//Initialize Parse

Parse.initialize("wF5Pd5fI6w6c5jbKHdEM9qKg3lLaQAw7phwYLnz2", "aKAGgKJ26LBBhqksgQzCW4iFvTZHyEL1125Gwznr");

//Work

(function(){

    //Create blog posts

    App.blog_posts = new App.Collections.Blogposts();

      //console.log(App.blog_posts);

      App.blog_posts.fetch().done(function() {

      App.router = new App.Routers.approuter();


      //console.log('on-on');
      Parse.history.start();

    })

    // Log Out
  //$('#logout').on('click', function (e) {
    //e.preventDefault();

    //Parse.User.logOut();
    //App.updateUser();
    //console.log(App.user);
    //console.log('Logged out');
    //App.router.navigate('login', {trigger: true});
    //});

  // Update User
  App.updateUser = function (){
    App.user = Parse.User.current();
    var currUsr;
    if (App.user == null){
      currUsr = '';
      $('#logOut').text('Log In');
    } else {
      currUsr = 'Welcome ' + App.user.attributes.username;
      $('#logOut').text('Log In');
    }
    $('#loggedIn').html(currUsr);
  };
  //console.log(App.updateUser);
  App.updateUser();


}());
