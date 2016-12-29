(function (angular) {
    'use strict';
    const myApp = angular.module('winCmdApp');

    myApp.service("fileListService", function($http) {
        const  files = [];

        const setFiles = function(newFiles) {
            files.splice(0, files.length);
            newFiles.map(e => files.push(e));
        };

        this.getFiles = function() {
            return files;
        };

        this.refresh = function () {
            // Fetches from the server the filtered events and the latest domains set
            $("body").css("cursor", "wait");
            $http.get("files").then(response => {
                setFiles(response.data);
                $("body").css("cursor", "auto");
            });
        };

        this.refresh();
    });

    myApp.component("myFilesList", {
            scope: {},
            templateUrl: "filesListDirective.html",
            controller: filesListDirectiveController
    });

    function filesListDirectiveController($scope, $rootScope, $http, fileListService) {
        var ctrl = this;

        ctrl.getFiles = function () {
            return fileListService.getFiles();
        };

        ctrl.rowClicked = function (file) {
            $rootScope.$broadcast("fileRowClicked", file);
        };

        // $scope.refresh = function () {
        //     // Fetches from the server the filtered events and the latest domains set
        //     $("body").css("cursor", "wait");
        //     $http.get("files").then(response => {
        //         fileListService.setFiles(response.data);
        //         $("body").css("cursor", "auto");
        //     });
        //
        //     $rootScope.$on("refreshFiles", e => $scope.refresh());
        //
        // };
        //
        // $scope.refresh();
    }

})(window.angular);