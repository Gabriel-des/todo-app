(function(){
  angular.module('todoApp')
    .controller('TaskController', TaskController);

  TaskController.$inject = ['TaskService'];
  function TaskController(TaskService) {
    var vm = this;
    vm.newTask = { title: '', description: '' };
    vm.tasks = [];

    vm.load = function() {
      TaskService.getAll().then(function(res){
        vm.tasks = res.data;
      });
    };

    vm.add = function() {
      TaskService.create(vm.newTask).then(function(){
        console.log('Tarefa criada com sucesso');
        vm.newTask = {};
        vm.load();
      });
    };

    vm.load();
  }
})();
