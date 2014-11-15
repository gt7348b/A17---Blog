(function() {

App.Views.CategoryPost = Parse.View.extend({

  tagname: 'ul',
  className: 'Category',

  events: {

  },

  template: _.template($('#publicblog').html()),

initialize: function(options) {

  this.options = options;

  this.render();

  $('#listBlogs').html(this.$el);
  console.log(this.collection);
},

  render: function(){

    var self = this;

  //clears our element
    this.$el.empty();

    _.each(this.collection, function (s) {

      if(s.attributes.draft === false){

    self.$el.append(self.template(s.toJSON()));

      }

    })

    return this;
  },

});

}());
