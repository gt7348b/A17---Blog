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
  $('#logOut').on('click', function (e) {
    e.preventDefault();

    Parse.User.logOut();
    App.updateUser();
    console.log(App.user);
    console.log('Logged out');
      App.router.navigate('start', {trigger: true});
    });

  // Update User
  App.updateUser = function (){
    App.user = Parse.User.current();
    var currUsr;
    if (App.user == null){
      currUsr = '';
      $('#logOut').text('Log In');
    } else {
      currUsr = 'Welcome ' + App.user.attributes.username;
      $('#logOut').text('Log Out');
    }
    $('#loggedIn').html(currUsr);
  };
//  console.log(App.updateUser);
    App.updateUser();


}());
