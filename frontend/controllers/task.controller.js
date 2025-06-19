(function () {
  angular.module("todoApp").controller("TaskController", TaskController);

  TaskController.$inject = ["TaskService"];
  function TaskController(TaskService) {
    var vm = this;
    vm.newTask = { title: "", description: "" };
    vm.tasks = [];
    vm.isEditing = false;
    vm.form = {};

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

    vm.updateTask = function (task) {
      TaskService.update(task).then(function () {
        console.log("Status atualizado com sucesso");
        vm.load();
        vm.resetForm();
      });
    };

    vm.delete = function (task) {
      if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
        TaskService.delete(task.id).then(function () {
          vm.load();
        });
      }
    };

    vm.startEditing = function (task) {
      vm.form = angular.copy(task);
      vm.isEditing = true;
    };

    vm.cancelEdit = function () {
      vm.resetForm();
    };

    vm.resetForm = function () {
      vm.form = {};
      vm.isEditing = false;
    };

    vm.load();
  }
})();
