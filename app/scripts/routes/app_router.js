
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
      $('.addIt').hide();

    },

    enterSite: function(){
      new App.Views.Login();
      new App.Views.SignUp();
      $('#entrance').show();
    },

    addPost: function(){
      new App.Views.AddPost();
      $('.addIt').show();
      $('#entrance').hide();
    },

    editBlog: function(id){
      var e = App.blog_posts.get(id);
     new App.Views.EditBlog({blogs: e});
     $('.addIt').show();
    },

    commentBlog: function(id){
      var c = App.blog_posts.get(id);
     new App.Views.SingleBlog({blogs: c});
    },

  });

}());
