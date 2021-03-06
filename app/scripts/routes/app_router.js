
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
      'author/:user' : 'authorBlog',
      'category/:tags' : 'tagBlog',
      'myposts' : 'mypostEdit',

    },

    home: function(){
      new App.Views.PublicBlogs({ collection: App.blog_posts, showHeader: false});
      $('.homeBtn').click(function() {
        location.reload();
      });
      $('.logIn').hide();
    },

    enterSite: function(){
      if(App.user) return App.router.navigate('', {trigger: true});
      new App.Views.Login();
      new App.Views.SignUp();
      new App.Views.PublicBlogs({ collection: App.blog_posts, showHeader: false});
      $('#logOut').click(function() {
        location.reload();
      });
      $('.logIn').show();
    },

    showdrafts: function(){
      new App.Views.ListBlogs({ collection: App.blog_posts, showHeader: true});
      $('.logIn').hide();
      $('.draftBtn').click(function() {
        location.reload();
      });
    },

    addPost: function(){
      new App.Views.AddPost({showHeader: true});
      $('.logIn').hide();
      $('#postIt').click(function() {
        location.reload();
      });
      $('#draftIt').click(function() {
        location.reload();
      });

    },

    editBlog: function(id){
      var e = App.blog_posts.get(id);
     new App.Views.EditBlog({blogs: e, showHeader: true});
     $('.logIn').hide();
    },

    commentBlog: function(id){
      var c = App.blog_posts.get(id);
      new App.Views.SingleBlog({blogs: c, showHeader: true});
      $('.logIn').hide();
      $('#commentPost').click(function() {
        location.reload();
      });
    },

    authorBlog: function(user){

      var author = new Parse.Query(App.Models.Post),
          c;

      author.equalTo('user', user);

      author.find({

        success: function(results){

          c = results;

          new App.Views.AuthorPost({collection: c, showHeader: true});
          $('.logIn').hide();
        }
      });
    },

    tagBlog: function(tags){
      console.log('hi');
      console.log(tags);
      console.log(App.blog_posts);

      var category = new Parse.Query(App.Models.Post),
        c;

      category.equalTo('tags', tags);

      category.find({

        success: function(results){

          c = results;

          new App.Views.CategoryPost({collection: c, showHeader: true});
          $('.logIn').hide();

        }

      });

    },

    mypostEdit: function() {
      new App.Views.MyBlogs({ collection: App.blog_posts, showHeader: true});
      $('.logIn').hide();
    }

  });

}());
