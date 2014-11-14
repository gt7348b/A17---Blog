
(function(){

App.Views.Login = Parse.View.extend ({

  className: "LogIn",

  events: {

    "submit #login" : "loginUser",
  //  "submit #logout" : "logoutUser",
  },

  template: $("#usersignin").html(),

  initialize: function() {
    this.render();

    $('#logged').html(this.$el);
  },

  render: function() {

    this.$el.html(this.template);
  },

  loginUser: function(e) {

    e.preventDefault();

    var username = $('#username').val();
    var password = $('#password').val();

    Parse.User.logIn(username, password, {
      success: function(user){
        App.user = user;
        App.updateUser();
      },

      error: function(user, error) {
        alert("Error");
      }

    });

    //clear my form
    $("#login")[0].reset();
    App.router.navigate('', { trigger: true });
  },

});

}());
