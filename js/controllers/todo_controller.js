//When called from the template to display the current isCompleted state of the todo, this property will proxy that question to its underlying model. When called with a value because a user has toggled the checkbox in the template, this property will set the isCompleted property of its model to the passed value (true or false), persist the model update, and return the passed value so the checkbox will display correctly.

Todos.TodoController = Ember.ObjectController.extend({
  
  actions: {
    editTodo: function() {
      this.set('isEditing', true);
    },
    
      acceptChanges: function() {
      this.set('isEditing', false);

      if (Ember.isEmpty(this.get('model.title'))) {
        this.send('removeTodo');
      } else {
        this.get('model').save();
      }
    },
    removeTodo: function () {
      var todo = this.get('model');
      todo.deleteRecord();
      todo.save();
    }
    
  },

  isEditing: false,
//Above we defined an initial isEditing value of false for controllers of this type and said that when the editTodo action is called it should set the isEditing property of this controller to true. This will automatically trigger the sections of template that use isEditing to update their rendered content. This method will also set the controller's isEditing property to false and commit all changes made to the todo.
  
  
  isCompleted: function(key, value){
    var model = this.get('model');

    if (value === undefined) {
      // property being used as a getter
      return model.get('isCompleted');
    } else {
      // property being used as a setter
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }.property('model.isCompleted')
  
});


Todos.TitleName = Ember.ObjectController.extend({
  titleName: function (){  
    var titleName = prompt ("New Title");
    return titleName;
  }
});