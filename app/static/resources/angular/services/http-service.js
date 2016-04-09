angular.module('http-service', ['log-service'])
.service('HTTPService', function ($http, $q, LogService) {
  var objectName = 'services.http-service';
  return {
   get: function(url, timeout) {
     var message = 'retrieving data from [' + url + ']';
     var deferred = $q.defer();
     $http.get(url, { timeout: timeout })
       .success(function(data, status, headers, config) {
         logservice.logEntry(objectName, 'success', message, { 'data': data, 'status': status, 'headers': headers, 'config': config }, 2);
         deferred.resolve(data);
       }).error(function(data, status, headers, config) {
         logservice.logEntry(objectName, 'error', message + ' [Error: ' + data + ', Status: ' + status + ']', { 'data': data, 'status': status, 'headers': headers, 'config': config }, 4);
         deferred.reject({ message: data, code: status });
       });
     return deferred.promise;
   }
 };
});