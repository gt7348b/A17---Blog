
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
      'draft' : 'showdrafts',
      'comment/:id' : 'commentBlog',
    },

    home: function(){
      new App.Views.PublicBlogs({ collection: App.blog_posts});
      $('.logIn').hide();
    },

    enterSite: function(){
      if(App.user) return App.router.navigate('', {trigger: true});
      new App.Views.Login();
      new App.Views.SignUp();
      new App.Views.ListBlogs({ collection: App.blog_posts});
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
