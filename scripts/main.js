// This sets up global apps

          window.App = {};
          App.Models = {};
          App.Collections = {};
          App.Views = {};
          App.Routers = {};


$( document ).ready(function(){

  App.Models.Post = Parse.Object.extend({

    className: 'blogPost',

    defaults: {
      title: '',
      content: '',
      tags: '',
      user: '',
      submitted: '',
      comments: '',
      createdAt: '',
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
    comparator: function (model) {
    return (model.get('date'));
  },

  });

}());


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

    App.router.navigate('', {trigger: true});
  },

    draftpost: function(e) {
      e.preventDefault();
      this.addpost(true);
    },

    addpublic: function(e) {
      e.preventDefault();
      this.addpost(false);
    }

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
      console.log(this);
    },

    updateBlog: function (e) {
      e.preventDefault();

      // Update our Model Instance
      this.options.blogs.set({
        title: $("#update_title").val(),
        content: $("#update_content").val(),
        tags: $("#update_category").val(),
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

//this is Draft Views By User


$( document ).ready(function(){

App.Views.ListBlogs = Parse.View.extend ({

  tagName: 'ul',
  className: 'Show',

    events: {
      'click #poster' : 'makePublic',
    },

    template: _.template($('#mainblog').html()),

  initialize: function(options) {

    this.options = options;

    this.collection.off();
    this.collection.on('sync', this.render, this);
    this.collection.on('destroy', this.render, this);

    this.userQuery();

    $('#listBlogs').html(this.$el);
    console.log(this.collection);
  },

  userQuery: function(){

    var self= this;

    var user_name = new Parse.Query(App.Models.Post);

    user_name.equalTo('user', App.user.attributes.username);

    user_name.find({

      success: function(results){

        console.log(results);

        self.collection.models = results;

        self.render();
      }

    });

  },

  render: function(){

    var self = this;

    //clears our element
    this.$el.empty();

     this.collection.each(function (s) {
          if (s.attributes.draft === true) {
        self.$el.append(self.template(s.toJSON()));
        }

      });

  /*       // Sorting On The Fly
    if (this.options.sort != undefined) {
      // Setting up a localized collection to sort by our sort param
      var list_collection = this.collection.sortBy( function (model) {
        return model.get(self.options.sort);
      });
      _.each(list_collection, function (s) {
         if (s.attributes.draft === true) {
        self.$el.append(self.template(s.toJSON()));
       }
      })
    } else {
      // Sort from our default
      this.collection.sort();
      this.collection.each(function (s) {
        if (s.attributes.draft === true) {
        self.$el.append(self.template(s.toJSON()));
        }

      });
    }*/
      return this;
    },

  makePublic: function () {


  }

});

}());

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


(function(){

App.Views.PublicBlogs = Parse.View.extend ({

  tagName: 'ul',
  className: 'Public',

    events: {

    },

    template: _.template($('#publicblog').html()),

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
          if (s.attributes.draft === false) {
        self.$el.append(self.template(s.toJSON()));
      }

      })

      return this;

  },

});


}());

/*         // Sorting On The Fly
    if (this.options.sort != undefined) {
      // Setting up a localized collection to sort by our sort param
      var list_collection = this.collection.sortBy( function (model) {
        return model.get(self.options.sort);
      });
      _.each(list_collection, function (s) {
         if (s.attributes.draft === false) {
        self.$el.append(self.template(s.toJSON()));
       }
      })
    } else {
      // Sort from our default
      this.collection.sort();
      this.collection.each(function (s) {
        if (s.attributes.draft === false) {
        self.$el.append(self.template(s.toJSON()));
        }

      });
    } */


$( document ).ready(function(){

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
        App.updateUser();
      },

      error: function(user, error) {
        alert("Error");
      }

    });

    //clear my form
    $("#login")[0].reset();
    App.router.navigate('', { trigger: true });
  },

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

        console.log("sign up")

        Parse.User.logIn(username, password, {
          success: function(user){
            App.user = user;
            App.updateUser();
            console.log(App.user);
          },

          error: function(user, error) {
            alert("Error");
          }

        });

        App.router.navigate('', { trigger: true });

      } else {
          window.alert('Passwords Do Not Match');
      }

    //Clear form

    $("#newuser")[0].reset();
  }

});

}());


$( document ).ready(function(){

  App.Routers.approuter = Parse.Router.extend({

    initialize: function () {

    //Parse.history.start();

    },

    routes: {
      '' : 'home',
      'start': 'enterSite',
      'add' : 'addPost',
      'edit/:id' : 'editBlog',
      'draft' : 'showdrafts',
      'comment/:id' : 'commentBlog',
    //  'sort/:sortby' : 'home',
    //  'sort/:sortby' : 'showdrafts',
    },

    home: function(){
      new App.Views.PublicBlogs({ collection: App.blog_posts});
      $('.logIn').hide();
    },

    enterSite: function(){
      if(App.user) return App.router.navigate('', {trigger: true});
      new App.Views.Login();
      new App.Views.SignUp();
      new App.Views.PublicBlogs({ collection: App.blog_posts});
      $('.logIn').show();
    },

    showdrafts: function(){
      new App.Views.ListBlogs({ collection: App.blog_posts});
      $('.logIn').hide();
    },

    addPost: function(){
      new App.Views.AddPost();
      $('.logIn').hide();
    },

    editBlog: function(id){
      var e = App.blog_posts.get(id);
     new App.Views.EditBlog({blogs: e});
     $('.logIn').hide();
    },

    commentBlog: function(id){
      var c = App.blog_posts.get(id);
      new App.Views.SingleBlog({blogs: c});
      $('.logIn').hide();
    },


  });

}());

//Initialize Parse

Parse.initialize("wF5Pd5fI6w6c5jbKHdEM9qKg3lLaQAw7phwYLnz2", "aKAGgKJ26LBBhqksgQzCW4iFvTZHyEL1125Gwznr");

//Work

$( document ).ready(function(){

    //Create blog posts

    App.blog_posts = new App.Collections.Blogposts();

      //console.log(App.blog_posts);

      App.blog_posts.fetch().done(function() {

      App.router = new App.Routers.approuter();


      //console.log('on-on');
      Parse.history.start();

    })

    // Log Out
  $('#logOut').on('click', function (e) {
    e.preventDefault();

    Parse.User.logOut();
    App.updateUser();
      App.router.navigate('start', {trigger: true});
    });

  // Update User
  App.updateUser = function (){
    App.user = Parse.User.current();
    var currUsr;
    if (App.user == null){
      currUsr = '';
      $('#logOut').text('Log In');
      $('.addBtn').hide();
      $('.draftBtn').hide();
      $('#updatePublic').hide();
    } else {
      currUsr = 'Welcome ' + App.user.attributes.username;
      $('#logOut').text('Log Out');
      $('.addBtn').show();
      $('.draftBtn').show();
      $('.publicWrite #updatePublic').show();
    }
    $('#loggedIn').html(currUsr);
  };
    App.updateUser();

}());
