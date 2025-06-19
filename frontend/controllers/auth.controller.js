(function(){
  angular.module('todoApp')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$state','AuthenticationService'];
  function AuthController($state, AuthenticationService) {
    var vm = this;

    vm.credentials = {
      email: '',
      password: ''
    };

    vm.login = function() {
      AuthenticationService.login(vm.credentials)
        .then(function() {
          $state.go('tasks');
        })
        .catch(function(err){
          vm.error = err.data.message || 'Falha ao logar';
        });
    };

    vm.register = function() {
      AuthenticationService.register(vm.credentials)
        .then(function() {
          $state.go('tasks');
        })
        .catch(function(err){
          vm.error = err.data.message || 'Falha ao registrar';
        });
    };
  }
})();
