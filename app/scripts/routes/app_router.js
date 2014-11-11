
(function(){

  App.Routers.approuter = Parse.Router.extend({

    routes: {
      '' : 'home',
      'add' : 'addPost'
    },

    home: function(){

    },

    addPost: function(){
      console.log('On-on');

      new App.Views.AddPost();

    }


  });

}());
