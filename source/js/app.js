var app = angular.module('stemVrouw', []);

app.controller('CandidateCtrl', function ($scope, $http) {

  var json = 'jsonkandidaten.json';
  $scope.affiliation;
  $scope.loading ='loading...';
  $http.get(json).then(handleSuccess, handleError);

  $scope.generateRandomWoman = function(party) {
    console.log('random woman', party);
    console.log($scope.affiliation);
    var partyObject = _.find($scope.affiliation, function(item){return item.AffiliationIdentifier.MenuName == party;});
    var candidateList = partyObject.Candidate;
    console.log('candidateList = ', candidateList);


    for(var i = 0; i = 100; i++) {
      var randomPerson = candidateList[Math.floor(Math.random() * candidateList.length)];
      if (randomPerson.Gender == 'female') {
        return $scope.randomWoman = randomPerson.CandidateFullName.PersonName.FirstName.__text + ' ' + '' + randomPerson.CandidateFullName.PersonName.LastName.__text;
      }
      return $scope.randomWoman
    }



    console.log('$scope.randomWoman = ', $scope.randomWoman);


  };

  function handleSuccess(response) {
    $scope.loading = '';
    $scope.affiliation = response.data.EML.CandidateList.Election.Contest.Affiliation;
    // console.log( $scope.affiliation);
    // console.log( $scope.affiliation[0]);
    // console.log( $scope.affiliation[0]);
  };
  function handleError(error) {
    console.log( error);
  };

});

$( document ).ready(function(){
  $(".button-collapse").sideNav();
  $('.scrollspy').scrollSpy();
  $('select').material_select();
});
