//Initialize Parse

Parse.initialize("wF5Pd5fI6w6c5jbKHdEM9qKg3lLaQAw7phwYLnz2", "aKAGgKJ26LBBhqksgQzCW4iFvTZHyEL1125Gwznr");

//Work

(function(){

    //Create blog posts

    App.blog_posts = new App.Collections.Blogposts();

      console.log('Are you?');

    //App.blog_posts.fetch().done(function(){

      //console.log(App.blog_posts);

      App.router = new App.Routers.approuter();
      console.log('on-on');

    //})


}());
