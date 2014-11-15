(function(){

  App.Collections.Blogposts = Parse.Collection.extend({

    model: App.Models.Post,
    comparator: function (model) {
    return (model.get('date'));
  },

  });

}());
