(function () {
  angular.module("todoApp").factory("HeaderService", HeaderService);

  HeaderService.$inject = ["$http", "$rootScope", "API_URL"];
  function HeaderService($http, $rootScope, API_URL) {
    return {
      logout: logout,
    };

    function logout() {
      return $http.post(API_URL + "/auth/logout").then(function (res) {
        localStorage.removeItem("jwtToken");
        $rootScope.isLoggedIn = !!localStorage.getItem("jwtToken");
        return res;
      });
    }
  }
})();
