//this is Draft Views By User
(function(){

App.Views.AuthorPost = Parse.View.extend ({

  tagName: 'ul',
  className: 'Author',

    events: {

    },

    template: _.template($('#publicblog').html()),

  initialize: function(options) {

    this.options = options;

    //this.collection.off();
    //this.collection.on('sync', this.render, this);

    this.render();

    $('#listBlogs').html(this.$el);
    console.log(this.collection);
  },


  render: function(){

    var self = this;

    //clears our element
    this.$el.empty();

      _.each(this.collection, function (s) {

        console.log(s);

        if (s.attributes.draft === false){

          self.$el.append(self.template(s.toJSON()));
        }

      })

      return this;

  },

});


}());
