(function(){
  angular.module('todoApp')
    .factory('AuthenticationService', AuthenticationService);

  AuthenticationService.$inject = ['$http', 'API_URL'];
  function AuthenticationService($http, API_URL) {
    return {
      login: login,
      register: register,
      getToken: getToken,
      logout: logout
    };

    function login(credentials) {
      return $http.post(API_URL + '/auth/login', credentials)
        .then(function(res){
          var token = res.data.access_token || res.data.token;
          if (token) {
            localStorage.setItem('jwtToken', token);
          }
          return res;
        });
    }

    function register(credentials) {
      return $http.post(API_URL + '/auth/register', credentials)
        .then(function(res){
          var token = res.data.access_token || res.data.token;
          if (token) {
            localStorage.setItem('jwtToken', token);
          }
          return res;
        });
    }

    function getToken() {
      return localStorage.getItem('jwtToken');
    }

    function logout() {
      localStorage.removeItem('jwtToken');
    }
  }
})();
