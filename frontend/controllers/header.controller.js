(function () {
  angular.module("todoApp").controller("HeaderController", HeaderController);

  HeaderController.$inject = ["$state", "HeaderService"];
  function HeaderController($state, HeaderService) {
    var vm = this;

    vm.logout = function () {
      HeaderService.logout()
        .then(function () {
          localStorage.removeItem("jwtToken");
          $state.go("login");
        });
    };
  }
})();
