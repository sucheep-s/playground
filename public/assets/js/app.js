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
myApp.factory('FileService', function($http){

	var factory = {};

	return factory;

});
myApp.factory('UserService', function($http){

	var factory = {};
	var urlBase = 'http://192.168.1.38/buswifi/rest/userapi';

	factory.getUsers = function(){
		return $http.get(urlBase+'/getusers?sort=createDate&order=desc&max=10&page=1');
	};

	factory.getUser = function(id){
		return $http.get(urlBase);
	};

	factory.addUser = function(user){
		return $http.post(urlBase, user);
	};

	return factory;

});
myApp.controller('CalendarController', ['$scope', function($scope){
   var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    /* event source that pulls from google.com */
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };
    /* event source that contains custom events on the scope */
    $scope.events = [
      {title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];
    
    $scope.goToRootScopeDate = function(date, jsEvent, view){
      alert(date);
    };
    $scope.loading = function(isLoading, view){
      alert("is loading" + isLoading);
    };
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        loading: $scope.loading, 
        dayClick: $scope.goToRootScopeDate,
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize, 
        defaultView: 'month'
      }
    };


    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource];
}]);
myApp.controller('FileController', function($scope, $location, FileUploader, FileService){
	$scope.uploader = new FileUploader();
});
myApp.controller('MapController', function($scope, $location, $log){

  $scope.map = {
    center: {
      latitude: 13.742906,
      longitude: 100.548891
    },
    zoom: 16,
    bounds: {}
  };

  $scope.markers = [
    {
      id: 0,
      coords: {
        latitude: 13.742716,
        longitude: 100.547852
      },
      options: {
        draggable: true,
        icon:'/assets/images/icon.png'
      }
    },
    {
      id: 1,
      coords: {
        latitude: 13.743396,
        longitude: 100.546059
      },
      options: {
        draggable: true,
        icon:'/assets/images/icon.png'
      }
    },
    {
      id: 2,
      coords: {
        latitude: 13.742897,
        longitude: 100.551003
      },
      options: {
        draggable: true,
        icon:'/assets/images/icon.png'
      }
    }

  ];

});

myApp.controller('UserController', function($scope, $location, UserService){

	$scope.init = function(){
		getUsers(); 
	};

	function getUsers(){

		UserService.getUsers().success(function(data){

			$scope.users = data.userList;

		}).error(function(error){
			//handle error
		});
	}

	$scope.addUser = function(){

		var user = {
			mobileNo : $scope.mobileNo,
			dateOfBirth : $scope.dateOfBirth,
			gender : $scope.gender,
			createDate : $scope.createDate
		};

		UserService.addUser(user).success(function(){
			$location.path('/users');
		});
		
	};

	// COLLAPSE =====================
  	$scope.navbarCollapse = false;

});
/*
*  AngularJs Fullcalendar Wrapper for the JQuery FullCalendar
*  API @ http://arshaw.com/fullcalendar/
*
*  Angular Calendar Directive that takes in the [eventSources] nested array object as the ng-model and watches it deeply changes.
*       Can also take in multiple event urls as a source object(s) and feed the events per view.
*       The calendar will watch any eventSource array and update itself when a change is made.
*
*/

angular.module('ui.calendar', [])
  .constant('uiCalendarConfig', {calendars: {}})
  .controller('uiCalendarCtrl', ['$scope', 
                                 '$locale', function(
                                  $scope, 
                                  $locale){

      var sources = $scope.eventSources,
          extraEventSignature = $scope.calendarWatchEvent ? $scope.calendarWatchEvent : angular.noop,

          wrapFunctionWithScopeApply = function(functionToWrap){
              return function(){
                  // This may happen outside of angular context, so create one if outside.

                  if ($scope.$root.$$phase) {
                      return functionToWrap.apply(this, arguments);
                  } else {
                      var args = arguments;
                      var self = this;
                      return $scope.$root.$apply(function(){
                          return functionToWrap.apply(self, args);
                      });
                  }
              };
          };

      var eventSerialId = 1;
      // @return {String} fingerprint of the event object and its properties
      this.eventFingerprint = function(e) {
        if (!e._id) {
          e._id = eventSerialId++;
        }
        
        var extraSignature = extraEventSignature({event: e}) || '';
        var start = moment.isMoment(e.start) ? e.start.unix() : (e.start ? moment(e.start).unix() : '');
        var end =   moment.isMoment(e.end)   ? e.end.unix()   : (e.end   ? moment(e.end).unix()   : '');
        
        // This extracts all the information we need from the event. http://jsperf.com/angular-calendar-events-fingerprint/3
        return "" + e._id + (e.id || '') + (e.title || '') + (e.url || '') + start + end +
          (e.allDay || '') + (e.className || '') + extraSignature;
      };

      var sourceSerialId = 1, sourceEventsSerialId = 1;
      // @return {String} fingerprint of the source object and its events array
      this.sourceFingerprint = function(source) {
          var fp = '' + (source.__id || (source.__id = sourceSerialId++)),
              events = angular.isObject(source) && source.events;
          if (events) {
              fp = fp + '-' + (events.__id || (events.__id = sourceEventsSerialId++));
          }
          return fp;
      };

      // @return {Array} all events from all sources
      this.allEvents = function() {
        // do sources.map(&:events).flatten(), but we don't have flatten
        var arraySources = [];
        for (var i = 0, srcLen = sources.length; i < srcLen; i++) {
          var source = sources[i];
          if (angular.isArray(source)) {
            // event source as array
            arraySources.push(source);
          } else if(angular.isObject(source) && angular.isArray(source.events)){
            // event source as object, ie extended form
            var extEvent = {};
            for(var key in source){
              if(key !== '_id' && key !== 'events'){
                 extEvent[key] = source[key];
              }
            }
            for(var eI = 0;eI < source.events.length;eI++){
              angular.extend(source.events[eI],extEvent);
            }
            arraySources.push(source.events);
          }
        }
        return Array.prototype.concat.apply([], arraySources);
      };

      // Track changes in array of objects by assigning id tokens to each element and watching the scope for changes in the tokens
      // @param {Array|Function} arraySource array of objects to watch
      // @param tokenFn {Function} that returns the token for a given object
      // @return {Object}
      //  subscribe: function(scope, function(newTokens, oldTokens))
      //    called when source has changed. return false to prevent individual callbacks from firing
      //  onAdded/Removed/Changed:
      //    when set to a callback, called each item where a respective change is detected
      this.changeWatcher = function(arraySource, tokenFn) {
        var self;
        var getTokens = function() {
          var array = angular.isFunction(arraySource) ? arraySource() : arraySource;
          var result = [], token, el;
          for (var i = 0, n = array.length; i < n; i++) {
            el = array[i];
            token = tokenFn(el);
            map[token] = el;
            result.push(token);
          }
          return result;
        };

        // @param {Array} a
        // @param {Array} b
        // @return {Array} elements in that are in a but not in b
        // @example
        //  subtractAsSets([6, 100, 4, 5], [4, 5, 7]) // [6, 100]
        var subtractAsSets = function(a, b) {
          var result = [], inB = {}, i, n;
          for (i = 0, n = b.length; i < n; i++) {
            inB[b[i]] = true;
          }
          for (i = 0, n = a.length; i < n; i++) {
            if (!inB[a[i]]) {
              result.push(a[i]);
            }
          }
          return result;
        };

        // Map objects to tokens and vice-versa
        var map = {};

        // Compare newTokens to oldTokens and call onAdded, onRemoved, and onChanged handlers for each affected event respectively.
        var applyChanges = function(newTokens, oldTokens) {
          var i, n, el, token;
          var replacedTokens = {};
          var removedTokens = subtractAsSets(oldTokens, newTokens);
          for (i = 0, n = removedTokens.length; i < n; i++) {
            var removedToken = removedTokens[i];
            el = map[removedToken];
            delete map[removedToken];
            var newToken = tokenFn(el);
            // if the element wasn't removed but simply got a new token, its old token will be different from the current one
            if (newToken === removedToken) {
              self.onRemoved(el);
            } else {
              replacedTokens[newToken] = removedToken;
              self.onChanged(el);
            }
          }

          var addedTokens = subtractAsSets(newTokens, oldTokens);
          for (i = 0, n = addedTokens.length; i < n; i++) {
            token = addedTokens[i];
            el = map[token];
            if (!replacedTokens[token]) {
              self.onAdded(el);
            }
          }
        };
        return self = {
          subscribe: function(scope, onArrayChanged) {
            scope.$watch(getTokens, function(newTokens, oldTokens) {
              var notify = !(onArrayChanged && onArrayChanged(newTokens, oldTokens) === false);
              if (notify) {
                applyChanges(newTokens, oldTokens);
              }
            }, true);
          },
          onAdded: angular.noop,
          onChanged: angular.noop,
          onRemoved: angular.noop
        };
      };

      this.getFullCalendarConfig = function(calendarSettings, uiCalendarConfig){
          var config = {};

          angular.extend(config, uiCalendarConfig);
          angular.extend(config, calendarSettings);

          angular.forEach(config, function(value,key){
            if (typeof value === 'function'){
              config[key] = wrapFunctionWithScopeApply(config[key]);
            }
          });

          return config;
      };

    this.getLocaleConfig = function(fullCalendarConfig) {
      if (!fullCalendarConfig.lang || fullCalendarConfig.useNgLocale) {
        // Configure to use locale names by default
        var tValues = function(data) {
          // convert {0: "Jan", 1: "Feb", ...} to ["Jan", "Feb", ...]
          var r, k;
          r = [];
          for (k in data) {
            r[k] = data[k];
          }
          return r;
        };
        var dtf = $locale.DATETIME_FORMATS;
        return {
          monthNames: tValues(dtf.MONTH),
          monthNamesShort: tValues(dtf.SHORTMONTH),
          dayNames: tValues(dtf.DAY),
          dayNamesShort: tValues(dtf.SHORTDAY)
        };
      }
      return {};
    };
  }])
  .directive('uiCalendar', ['uiCalendarConfig', function(uiCalendarConfig) {
    return {
      restrict: 'A',
      scope: {eventSources:'=ngModel',calendarWatchEvent: '&'},
      controller: 'uiCalendarCtrl',
      link: function(scope, elm, attrs, controller) {

        var sources = scope.eventSources,
            sourcesChanged = false,
            calendar,
            eventSourcesWatcher = controller.changeWatcher(sources, controller.sourceFingerprint),
            eventsWatcher = controller.changeWatcher(controller.allEvents, controller.eventFingerprint),
            options = null;

        function getOptions(){
          var calendarSettings = attrs.uiCalendar ? scope.$parent.$eval(attrs.uiCalendar) : {},
              fullCalendarConfig;

          fullCalendarConfig = controller.getFullCalendarConfig(calendarSettings, uiCalendarConfig);

          var localeFullCalendarConfig = controller.getLocaleConfig(fullCalendarConfig);
          angular.extend(localeFullCalendarConfig, fullCalendarConfig);
          options = { eventSources: sources };
          angular.extend(options, localeFullCalendarConfig);
          //remove calendars from options
          options.calendars = null;

          var options2 = {};
          for(var o in options){
            if(o !== 'eventSources'){
              options2[o] = options[o];
            }
          }
          return JSON.stringify(options2);
        }

        scope.destroyCalendar = function(){
          if(calendar && calendar.fullCalendar){
            calendar.fullCalendar('destroy');
          }
          if(attrs.calendar) {
            calendar = uiCalendarConfig.calendars[attrs.calendar] = $(elm).html('');
          } else {
            calendar = $(elm).html('');
          }
        };

        scope.initCalendar = function(){
          if (!calendar) {
            calendar = angular.element(elm).html('');
          }
          calendar.fullCalendar(options);
          if(attrs.calendar) {
            uiCalendarConfig.calendars[attrs.calendar] = calendar;
          }          
        };
        scope.$on('$destroy', function() {
          scope.destroyCalendar();
        });

        eventSourcesWatcher.onAdded = function(source) {
          if (calendar && calendar.fullCalendar) {
            calendar.fullCalendar(options);
            if (attrs.calendar) {
                uiCalendarConfig.calendars[attrs.calendar] = calendar;
            }
            calendar.fullCalendar('addEventSource', source);
            sourcesChanged = true;
          }
        };

        eventSourcesWatcher.onRemoved = function(source) {
          if (calendar && calendar.fullCalendar) {
            calendar.fullCalendar('removeEventSource', source);
            sourcesChanged = true;
          }
        };

        eventSourcesWatcher.onChanged = function() {
          if (calendar && calendar.fullCalendar) {
            calendar.fullCalendar('refetchEvents');
            sourcesChanged = true;
          }

        };

        eventsWatcher.onAdded = function(event) {
          if (calendar && calendar.fullCalendar) {
            calendar.fullCalendar('renderEvent', event, (event.stick ? true : false));
          }
        };

        eventsWatcher.onRemoved = function(event) {
          if (calendar && calendar.fullCalendar) {
            calendar.fullCalendar('removeEvents', event._id);
          }
        };

        eventsWatcher.onChanged = function(event) {
          if (calendar && calendar.fullCalendar) {
            var clientEvents = calendar.fullCalendar('clientEvents', event._id);
            for (var i = 0; i < clientEvents.length; i++) {
              var clientEvent = clientEvents[i];
              clientEvent = angular.extend(clientEvent, event);
              calendar.fullCalendar('updateEvent', clientEvent);
            }
          }
        };

        eventSourcesWatcher.subscribe(scope);
        eventsWatcher.subscribe(scope, function() {
          if (sourcesChanged === true) {
            sourcesChanged = false;
            // return false to prevent onAdded/Removed/Changed handlers from firing in this case
            return false;
          }
        });

        scope.$watch(getOptions, function(newValue, oldValue) {
          if(newValue !== oldValue) {
            scope.destroyCalendar();
            scope.initCalendar();
          } else if((newValue && angular.isUndefined(calendar))) {
            scope.initCalendar();
          }
        });
      }
    };
}]);
angular.module('myApp.templates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("views/adduser.html",
    "<div class=page-adduser><header><center><h2>Add New User</h2></center></header><main class=body-addUser><form class=form-horizontal ng-submit=addUser()><div class=form-group><label class=\"col-lg-2 control-label\">Firstname</label><div class=col-lg-10><input class=\"form-control form-input\" name=firstName placeholder=Firstname ng-model=\"firstName\"></div></div><div class=form-group><label class=\"col-lg-2 control-label\">Lastname</label><div class=col-lg-10><input class=\"form-control form-input\" name=lastName placeholder=Lastname ng-model=\"lastName\"></div></div><div class=form-group><label class=\"col-lg-2 control-label\">Gender</label><div class=col-lg-10><select class=\"form-control form-input\" name=gender ng-model=gender ng-init=\"gender='0'\"><option value=0>Male</option><option value=1>Female</option></select></div></div><div class=form-group><label class=\"col-lg-2 control-label\">Email</label><div class=col-lg-10><input class=\"form-control form-input\" name=email placeholder=Email ng-model=\"email\"></div></div><div class=form-group><div class=\"col-lg-offset-2 col-lg-10\"><button type=submit class=\"btn btn-info\">Submit</button> <button type=submit class=\"btn btn-warning\">Reset</button></div></div></form></main></div>");
  $templateCache.put("views/calendar.html",
    "<div ui-calendar=uiConfig.calendar class=\"span8 calendar\" ng-model=eventSources></div>");
  $templateCache.put("views/drive.html",
    "<div><h3 class=page-header>Drive</h3><angular-filemanager></angular-filemanager></div>");
  $templateCache.put("views/file.html",
    "<div><input type=file nv-file-select uploader=\"uploader\"><br><ul><li ng-repeat=\"item in uploader.queue\">Name: <span ng-bind=item.file.name></span><br><button ng-click=item.upload()>upload</button></li></ul></div>");
  $templateCache.put("views/homepage.html",
    "<div><center><h1>Welcome to HOMEPAGE.</h1></center></div>");
  $templateCache.put("views/map.html",
    "<div id=page-map><h3 class=page-header>Locator</h3><ui-gmap-google-map center=map.center zoom=map.zoom draggable=true options=options bounds=map.bounds><ui-gmap-markers models=markers coords=\"'coords'\" options=\"'options'\"></ui-gmap-markers></ui-gmap-google-map></div>");
  $templateCache.put("views/userlist.html",
    "<div class=page-users ng-init=init()><header><center><h2>User List</h2></center></header><main class=body-user><div class=row><div class=col-md-3><input class=\"form-control input-block\" placeholder=\"Search Users\" ng-model=\"filterText\"></div></div><div class=\"table-responsive table-user\"><table class=\"table table-hover\"><thead><tr><th>Mobile Number</th><th>Date of Birth</th><th>Gender</th><th>Created Dated</th></tr></thead><tbody ng-repeat=\"user in users | filter:filterText\"><tr><td>{{user.mobileNo}}</td><td>{{user.dateOfBirth}}</td><td>{{user.gender == 1 ? 'Male' : 'Female'}}</td><td>{{user.createDate}}</td></tr></tbody></table></div></main></div>");
}]);
