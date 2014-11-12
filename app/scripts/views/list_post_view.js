
(function(){

App.Views.ListBlogs = Parse.View.extend ({

  tagName: 'ul',
  className: 'Show',

    events: {},

    template: $('#mainblog').html(),

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

      _.each(list_collection, function (s) {
        self.$el.append(self.template(s.toJSON()));
      })

      return this;
  },


});


}());
