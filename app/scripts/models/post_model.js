
$( document ).ready(function(){

  App.Models.Post = Parse.Object.extend({

    className: 'blogPost',

    defaults: {
      title: '',
      content: '',
      tags: '',
      user: '',
      submitted: '',
      comments: '',
    },

    idAttribute: 'objectID',

    initialize: function(){
      //console.log("Lucky?");

    }

  });


}());
