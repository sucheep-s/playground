var myApp = angular.module('myApp', ['ui.router', 'myApp.templates', 'ui.bootstrap', 'angularFileUpload', 'ui.calendar', 'uiGmapgoogle-maps']);

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/homepage");

  $stateProvider
    .state('homepage', {
      url: "/homepage",
      templateUrl: "views/homepage.html",
      controller: 'UserController'
    })
    .state('users', {
      url: "/users",
      templateUrl: "views/userlist.html",
      controller: 'UserController'
    })
    .state('adduser', {
      url: "/adduser",
      templateUrl: "views/adduser.html",
      controller: 'UserController'
    })
    .state('calendar', {
      url: "/calendar",
      templateUrl: "views/calendar.html",
      controller: 'CalendarController'
    })
    .state('file', {
      url: "/file",
      templateUrl: "views/file.html",
      controller: 'FileController'
    })
    .state('map', {
      url: '/map',
      templateUrl: 'views/map.html',
      controller: 'MapController'
    });
}]);


myApp.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCwc_JQAoQ8DEFzV5A6X3q5XiPptqIg4fk',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
});