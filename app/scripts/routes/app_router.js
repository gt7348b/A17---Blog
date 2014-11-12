
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
