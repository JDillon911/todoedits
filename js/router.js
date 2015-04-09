Todos.Router.map(function() {
  this.resource('todos', { path: '/' }, function() {
    // additional child routes will go here later
    this.route('active');
    this.route("completed");
  });
  this.resource('todosnew', { path: '/new' }, function() {
    // additional child routes will go here later
    this.route('active');
    this.route("completed");
  });
  this.resource('todosnew2', { path: '/new2' }, function() {
    // additional child routes will go here later
    this.route('active');
    this.route("completed");
  });
  this.resource('todosnew3', { path: '/new3' }, function() {
    // additional child routes will go here later
    this.route('active');
    this.route("completed");
  });
});

Todos.TodosRoute = Ember.Route.extend({
  model: function () {
    return this.store.find("todo");
  }
});

Todos.TodosIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('todos');
  }
});
//When the application loads at the url '/' Ember.js will enter the todos route and render the todos template as before. It will also transition into the todos.index route and fill the {{outlet}} in the todos template with the todos/index template (in the script tag at the top of index.html). The model data for this template is the result of the model method of TodosIndexRoute, which indicates that the model for this route is the same model as for the TodosRoute.


Todos.TodosActiveRoute = Ember.Route.extend({
  model: function(){
    return this.store.filter('todo', function(todo) {
      return !todo.get('isCompleted');
    });
  },
  renderTemplate: function(controller) {
    this.render('todos/index', {controller: controller});
  }
});
//The model data for this route is the collection of todos whose isCompleted property is false. When a todo's isCompleted property changes this collection will automatically update to add or remove the todo appropriately.
//Normally transitioning into a new route changes the template rendered into the parent {{outlet}}, but in this case we'd like to reuse the existing todos/index template. We can accomplish this by implementing the renderTemplate method and calling render ourselves with the specific template and controller options.

Todos.TodosCompletedRoute = Ember.Route.extend({
  model: function() {
    return this.store.filter('todo', function(todo) {
      return todo.get('isCompleted');
    });
  },
  renderTemplate: function(controller) {
    this.render('todos/index', {controller: controller});
  }
});