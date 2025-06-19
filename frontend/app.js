// app.js
(function () {
  angular
    .module("todoApp", ["ui.router"])
    .constant("API_URL", "http://localhost:8000/api")
    .config(configureStates)
    .config(configureInterceptor);

  configureStates.$inject = ["$stateProvider", "$urlRouterProvider"];
  function configureStates($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("login", {
        url: "/login",
        templateUrl: "views/login.html",
        controller: "AuthController as auth",
      })
      .state("register", {
        url: "/register",
        templateUrl: "views/register.html",
        controller: "AuthController as auth",
      })
      .state("tasks", {
        url: "/tasks",
        templateUrl: "views/tasks.html",
        controller: "TaskController as task",
      });
    $urlRouterProvider.otherwise("/login");
  }

  configureInterceptor.$inject = ["$httpProvider"];
  function configureInterceptor($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
  }

  angular.module("todoApp").factory("AuthInterceptor", AuthInterceptor);

  AuthInterceptor.$inject = ["$q", "$injector"];
  function AuthInterceptor($q, $injector) {
    return {
      request: function (config) {
        var token = localStorage.getItem("jwtToken");
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
        return config;
      },

      responseError: function (response) {
        if (response.status === 401 || response.status === 403) {
          $injector.get("$state").go("login");
        }
        return $q.reject(response);
      },
    };
  }
})();
