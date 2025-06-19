(function () {
  let requests = 0;
  
  angular
    .module("todoApp", ["ui.router"])
    .constant("API_URL", "http://localhost:8000/api")
    .config(configureStates)
    .config(configureInterceptor)
    .factory("AuthInterceptor", AuthInterceptor)
    .run(runBlock);

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
      })
      .state("header", {
        url: "/header",
        templateUrl: "views/header.html",
        controller: "HeaderController as header",
      });

    $urlRouterProvider.otherwise("/login");
  }

  configureInterceptor.$inject = ["$httpProvider"];
  function configureInterceptor($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
  }

  AuthInterceptor.$inject = ["$q", "$injector", "$rootScope"];
  function AuthInterceptor($q, $injector, $rootScope) {
    function setLoading(value) {
      $rootScope.loading = value;
    }

    return {
      request: function (config) {
        var token = localStorage.getItem("jwtToken");
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
        requests++;
        setLoading(true);
        return config;
      },

      response: function (response) {
        if (--requests === 0) setLoading(false);
        return response;
      },

      responseError: function (response) {
        if (--requests === 0) setLoading(false);
        if (response.status === 401 || response.status === 403) {
          $injector.get("$state").go("login");
        }
        return $q.reject(response);
      },
    };
  }

  runBlock.$inject = ["$rootScope", "$transitions"];
  function runBlock($rootScope, $transitions) {
    $rootScope.isLoggedIn = !!localStorage.getItem("jwtToken");
    $rootScope.loading = false;

    $transitions.onSuccess({}, function () {
      $rootScope.isLoggedIn = !!localStorage.getItem("jwtToken");
    });
  }
})();
