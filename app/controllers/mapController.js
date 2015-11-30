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
