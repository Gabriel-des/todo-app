(function () {
  angular.module("todoApp").controller("TaskController", TaskController);

  TaskController.$inject = ["TaskService"];
  function TaskController(TaskService) {
    var vm = this;
    vm.newTask = { title: "", description: "" };
    vm.tasks = [];

    vm.load = function () {
      TaskService.getAll().then(function (res) {
        vm.tasks = res.data;
      });
    };

    vm.add = function () {
      TaskService.create(vm.newTask).then(function () {
        console.log("Tarefa criada com sucesso");
        vm.newTask = {};
        vm.load();
      });
    };

    vm.changeStatus = function (task) {
      TaskService.update(task).then(function () {
        console.log("Status atualizado com sucesso");
        vm.load();
      });
    };

    vm.delete = function (task) {
      if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
        TaskService.delete(task.id).then(function () {
          vm.load();
        });
      }
    };

    vm.load();
  }
})();
