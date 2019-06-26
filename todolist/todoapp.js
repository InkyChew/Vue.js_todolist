var filters = {
    all: function (todos) {
      return todos
    },
    active: function (todos) {
      return todos.filter(function (todo) {
        return !todo.completed
      })
    },
    completed: function (todos) {
      return todos.filter(function (todo) {
        return todo.completed
      })
    }
}
var app = new Vue({
    el:'#todoapp',
    data: {
      newtask: '',
      editask: '',
      todos: [],
    },
    directives: {
        focus: {
          inserted: function (el) {
            el.focus()
          }
        }
    },
    computed:{
        remaining: function(){
            var n = this.todos.filter(function(todo) { return !todo.completed; }).length;
            if(n===0){
                return
            }else if(n===1){
                return n + ' item left';
            }else{
                return n + ' items left';
            }
        },
    },
    methods: {
        add: function(newtask){
            if(newtask===''){
                return
            }
            this.todos.push({content: newtask, completed: false, edit:false});
            this.newtask='';
        },
        remove: function(todo){
            this.todos.splice(this.todos.indexOf(todo), 1);
        },
        edit: function(todo){
            todo.edit = true;
            this.editask = todo.content;
        },
        editdone: function(todo){
            todo.content = this.editask;
            todo.edit = false;            
        },
        clear: function(){
            var complete = this.todos.filter(function(todo) { return !todo.completed; });
            this.todos = complete;
        }
    }
})