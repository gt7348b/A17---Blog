
(function(){

App.Views.SignUp = Parse.View.extend({

  className: "SignUp",

  events: {
    "submit #newuser" : "signupUser",
  },

  template: $("#adduser").html(),

  intialize: function() {
    this.render();

    $("#signed").html(this.$el);
  },


  render: function() {
    this.$el.html(this.template);
  },

  signupUser: function(e) {

    e.preventDefault();

    var username = $('#newusername').val();
    var password = $('#newpassword').val();
    console.log(username);

    var user = new Parse.user();
      user.set('username', username);
      user.set('password', password);

    user.signUp (null, {
      success: function(user) {
      },
      error: function(user, error){
        alert("Error Signup");
      }

    });

  }

});

}());
