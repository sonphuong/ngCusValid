//diretive
let backend = angular.module('backend', []);
backend.directive('checkValidUrl',checkValidUrl);
function checkValidUrl($timeout,$http){
    return {
        restrict: 'A',
        // require NgModelController, i.e. require a controller of ngModel directive
        require: 'ngModel',
        // create linking function and pass in our NgModelController as a 4th argument
        link: function(scope, element, attr, ctrl) {
            let urlregex = /^[a-zA-Z0-9_-]*$/;
            // function isExist(ngModelValue) {
            //     let url = '/backend/article/checkURLExist/'+ngModelValue;
            //     return $http.get(url);
            // }
            function doValid(ngModelValue) {
                if (urlregex.test(ngModelValue)) {
                    ctrl.$setValidity('pattern', true);
                } else {
                    ctrl.$setValidity('pattern', false);
                }
                if (ngModelValue.length <= 30) {
                    ctrl.$setValidity('maxLength', true);
                } else {
                    ctrl.$setValidity('maxLength', false);
                }
                // let xhr = isExist(ngModelValue);
                // xhr.then((res) => {
                //     $timeout(function () {
                //         let isExist = res.data;
                //         if(isExist==="0"){
                //             ctrl.$setValidity('unique', true);
                //         }
                //         else{
                //             ctrl.$setValidity('unique', false);
                //         }
                //     });
                // });

                // we need to return our ngModelValue, to be displayed to the user(value of the input)
                return ngModelValue;
            }

            // we need to add our doValid function to an array of other(build-in or custom) functions
            // I have not notice any performance issues, but it would be worth investigating how much
            // effect does this have on the performance of the app
            ctrl.$parsers.push(doValid);
        }
    };
}
//controller code
let SurveyController = function ($scope) {
  $scope.submitForm = function () {
    $scope.isFormChecked = 1;
    $scope.isFrmValid = 0;
    console.log($scope);
      if($scope.frmSurvey.$valid){
          $scope.isFrmValid = 1;
      }
      else{
        if($scope.frmSurvey.$error){
          if($scope.frmSurvey.$error.required){
              $scope.frmSurvey.$error.required[0].$$element[0].focus();
          }else if($scope.frmSurvey.$error.pattern){
              $scope.frmSurvey.$error.pattern[0].$$element[0].focus();
          }
        }
      }
  };
}
SurveyController.$inject = ['$scope']; //inject
backend.controller('SurveyController', SurveyController); //register SurveyController with backend module
