
(function(){

  App.Routers.approuter = Parse.Router.extend({

    initialize: function () {

    Parse.history.start();

    },

    routes: {
      '' : 'home',
      'add' : 'addPost',
      'edit/:id' : 'editBlog',
    //  'comment/:id' : 'commentBlog',
    },

    home: function(){
      new App.Views.Login();
      new App.Views.SignUp();
      new App.Views.ListBlogs({ collection: App.blog_posts});
    },

    addPost: function(){
      new App.Views.AddPost();
    },

    editBlog: function(id){
      var e = App.blog_posts.get(id);
     new App.Views.SingleBlog({blogs: e});
    },

  });

}());
