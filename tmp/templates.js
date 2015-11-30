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
