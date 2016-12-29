(function (angular) {
    'use strict';
    const myApp = angular.module('winCmdApp');

    myApp.component("searchBar", {
            scope: {},
            templateUrl: "searchDirective.html",
            controller: searchDirectiveController
    });

    function searchDirectiveController($scope, $rootScope, $http, fileListService) {
        var ctrl = this;

        $rootScope.$on("fileRowClicked", function (event, file) {
            $scope.file = JSON.parse(JSON.stringify(file));
        });

        ctrl.modifyFile = function () {
            $("body").css("cursor", "wait");
            $http.post('/renameFile', $scope.file, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
                .success(function (data, status, headers, config) {
                    fileListService.refresh();
                })
        };

        ctrl.createFile = function () {
            $("body").css("cursor", "wait");
            $http.post('/createFile', $scope.file, {headers: {'Content-Type': 'application/json; charset=utf-8'}})
                .success(function (data, status, headers, config) {
                    fileListService.refresh();
                })
        };

    }
})(window.angular);