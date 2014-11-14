
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
