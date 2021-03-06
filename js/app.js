"use strict";

var tasksUrl = 'https://api.parse.com/1/classes/tasks';

angular.module('ToDoApp', ['ui.bootstrap'])
    .config(function($httpProvider) {
        //Parse required two extra headers sent with every HTTP request: X-Parse-Application-Id, X-Parse-REST-API-Key
        //the first needs to be set to your application's ID value
        //the second needs to be set to your application's REST API key
        //both of these are generated by Parse when you create your application via their web site
        //the following lines will add these as default headers so that they are sent with every
        //HTTP request we make in this application
        $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = '3f9djfuTHVlY1o4bS4Y1pqbRUvHIF9jKGtu512fj';
        $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'VEDZI4TQgnzClVQCyTm1ROh4Twb5GtSLQGQdMTCu';
    })
    .controller('TasksController', function($scope, $http) {
        //var tasksUrl = 'https://api.parse.com/1/classes/tasks';
        $scope.tasks = [];
        $scope.refreshTasks = function() {
            $http.get(tasksUrl + '?order=-votes')
                .success(function(data) {
                    $scope.tasks = data.results;
                });
        };
        $scope.refreshTasks();
        $scope.newTask = {votes: 0};
        $scope.addTask = function() {
            $scope.inserting = true;
            $http.post(tasksUrl, $scope.newTask)
                .success(function(responseData) {
                    $scope.newTask.objectId = responseData.objectId;
                    $scope.tasks.push($scope.newTask);
                    $scope.newTask = {votes: 0};
                })
                .finally(function() {
                    $scope.inserting = false;
                });
            };
            $scope.updateTask = function(task) {
                $http.put(tasksUrl + '/' + task.objectId, task)
                .success(function(){
                    //could give user feedback
                });
            };

            $scope.deleteTask = function(task) {
                $http.delete(tasksUrl + '/' + task.objectId)
                .success(function() {

                })
                .error(function(error) {

                })
                .finally(function() {
                   $scope.refreshTasks();
                });
            }


                $scope.incrementVotes = function(task, amount) {
                var postData = {
                    votes: {
                        __op: "Increment",
                        amount: amount
                    }
                };

                $scope.updating = true;
                $http.put(tasksUrl + '/' + task.objectId, postData)
                    .success(function(respData) {
                        task.votes = respData.votes;
                    })
                    .error(function(err) {
                        console.log(err);
                        $scope.updating = false;
                    })
                    .finally(function() {
                        $scope.updating = false;
                    });
            };



        });








/*
angular.module('ToDoApp', [])
	.config(function($httpProvider) {
		$httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'U1iEkFr6F74El2pRTfsY00q1wNp6xj4rPag7sBGk';
		$httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = '0t36Qpyc4ubnppH4rCxxelimBDKE1XVcoiLvr3Zk';
	})
	.controller('TasksController', function($scope, $http) {
		$scope.refreshTasks = function() {
		$http.get(tasksUrl + '?where={"done": false}')
			.success(function(data) {
				$scope.tasks = data.results;
			});
			
	};
	    $scope.refreshTasks();
        $scope.newTask = {done: false};
        $scope.addTask = function() {
            $scope.inserting = true;
            $http.post(tasksUrl, $scope.newTask)
                .success(function(responseData) {
                    $scope.newTask.objectId = responseData.objectId;
                    $scope.tasks.push($scope.newTask);
                    $scope.newTask = {done: false};
                })
                .finally(function() {
                    $scope.inserting = false;
                });
            };
            $scope.updateTask = function(task) {
                $http.put(tasksUrl + '/' + task.objectId, task)
                .success(function(){
                    //could give user feedback
                });
            }; 

                $scope.updating = true;
                $http.put(tasksUrl + '/' + task.objectId, postData)
                    .success(function(respData) {
                        task.votes = respData.votes;
                    })
                    .error(function(err) {
                        console.log(err);
                        $scope.updating = false;
                    })
                    .finally(function() {
                        $scope.updating = false;
                    });

        });


*/








/*
    app.js, main Angular application script
    define your module and controllers here
*/