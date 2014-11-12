
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
