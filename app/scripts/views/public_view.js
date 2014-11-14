
(function(){

App.Views.PublicBlogs = Parse.View.extend ({

  tagName: 'ul',
  className: 'Public',

    events: {

    },

    template: _.template($('#publicblog').html()),

  initialize: function(options) {

    this.options = options;

    this.render();

    this.collection.off();
    this.collection.on('sync', this.render, this);

    $('#listBlogs').html(this.$el);

  },

  render: function(){

    var self = this;

    //clears our element
    this.$el.empty();

      this.collection.each(function (s) {
        self.$el.append(self.template(s.toJSON()));
      })

      return this;

  },

  showLogin: function(event){
        event.preventDefault();

        $('.login').show();

      },

});


}());
