App = Ember.Application.create();

App.Router.map(function() {
  this.resource("libraries",function(){
    this.resource("library",{path:":library_id"},function(){
      this.resource("book",{path:"/books/:book_id"},function(){
       this.resource("page",{path:"/pages/:page_id"}); 
      });
    });
  });
});

App.Library = Em.Object.extend({
  id:null,
  name:null,
  books:null
});

App.Book = Em.Object.extend({
  id:null,
  name:null,
  pages:null
});

App.Page = Em.Object.extend({
  id:null,
  name:null,  
});


function findData(){
  var libData=[];
  var page1 = App.Page.create({id:1,name:"page1"});
  var page2 = App.Page.create({id:2,name:"page2"});
  var page3 = App.Page.create({id:3,name:"page3"});
  var page4 = App.Page.create({id:4,name:"page4"});
  
  
  var book1 = App.Book.create({id:1,name:"book1",pages:[]});
  book1.get("pages").pushObject(page1);
  
  var book2 = App.Book.create({id:2,name:"book2",pages:[]});
  book2.get("pages").pushObject(page2);
  
  var book3 = App.Book.create({id:3,name:"book3",pages:[]});
  book3.get("pages").pushObject(page3);
  book3.get("pages").pushObject(page4);
  
  var lib1 = App.Library.create({id:1,name:"lib1",books:[]});
  lib1.get("books").pushObject(book1);
  lib1.get("books").pushObject(book3);
  
  var lib2 = App.Library.create({id:2,name:"lib2",books:[]});
  lib2.get("books").pushObject(book2);
  
  libData.pushObject(lib1);
  libData.pushObject(lib2);
  return libData;
  
}


App.IndexRoute = Ember.Route.extend({
  redirect:function(){this.transitionTo("libraries");}
});

App.LibrariesRoute = Ember.Route.extend({
  model:function(){
    return findData();
  },
  setupController:function(controller,model){
    this.controllerFor("menu").set("libs",model);
    this.controllerFor("menu").set("books",null);
    this.controllerFor("menu").set("pages",null);
  }
});

App.LibraryRoute = Ember.Route.extend({
  model:function(params){
    var data = this.modelFor("libraries").findBy("id",parseInt(params.library_id,10));
    return data;
  },
  setupController:function(controller,model){
    controller.set("model",model);
    this.controllerFor("menu").set("books",model.get("books"));
    this.controllerFor("menu").set("pages",null);
  }
});

App.BookRoute = Ember.Route.extend({
  model:function(params){
    return this.modelFor("library").get("books").findBy("id",parseInt(params.book_id,10));
  },
  setupController:function(controller,model){
    controller.set("model",model);
    this.controllerFor("menu").set("pages",model.get("pages"));
  },
});

App.PageRoute = Ember.Route.extend({
  model:function(params){
    return this.modelFor("book").get("pages").findBy("id",parseInt(params.page_id,10));
  }
});

App.MenuController = Ember.Controller.extend();

App.MenuView = Ember.View.extend({
  templateName:"menu"
});