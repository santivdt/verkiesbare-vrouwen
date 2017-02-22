var app = angular.module('stemVrouw', []);

app.controller('CandidateCtrl', function ($scope, $http) {

  var json = 'jsonkandidaten.json';
  $scope.affiliation;
  $scope.loading ='loading...';
  $http.get(json).then(handleSuccess, handleError);

  function handleSuccess(response) {
    $scope.loading = '';
    $scope.affiliation = response.data.EML.CandidateList.Election.Contest.Affiliation;
    // console.log( $scope.affiliation);
    console.log( $scope.affiliation[0]);
  };
  function handleError(error) {
    console.log( error);
  };

});

$( document ).ready(function(){
  $(".button-collapse").sideNav();
  $('.scrollspy').scrollSpy();
});
