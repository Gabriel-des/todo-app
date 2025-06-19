
angular.module('todoApp')
  .service('TaskService', function($http, API_URL) {
    this.getAll = function() {
      return $http.get(API_URL + '/tasks');
    };
    this.create = function(task) {
      return $http.post(API_URL + '/tasks', task);
    };
    this.update = function(task) {
      return $http.put(API_URL + '/tasks/' + task.id, task);
    };
    this.delete = function(id) {
      return $http.delete(API_URL + '/tasks/' + id);
    };
  });
