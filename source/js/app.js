var app = angular.module('stemVrouw', []);

app.controller('CandidateCtrl', function ($scope, $http) {

  var json = 'jsonkandidaten.json';
  $scope.affiliation;
  $scope.loading ='loading...';
  $http.get(json).then(handleSuccess, handleError);

  $scope.generateRandomWoman = function(party) {
    console.log('Generating random woman from the ', party);

    if(party == 'SGP') {
      $scope.randomWoman = ' ...helaas, er is geen vrouw!';
    }

    var partyObject = _.find($scope.affiliation, function(item){return item.AffiliationIdentifier.MenuName == party;});
    var candidateList = partyObject.Candidate;
    console.log(candidateList.length);
    var womenOfSelectedParty = [];
    for (var i = 0; i < candidateList.length; i++) {
      if(candidateList[i].Gender == 'female') {
        womenOfSelectedParty.push(candidateList[i]);
        }
    }

    var rWO = womenOfSelectedParty[Math.floor(Math.random() * womenOfSelectedParty.length)];
    console.log('rWO = ', rWO);
    var randomWoman = rWO.CandidateFullName.PersonName.FirstName.__text + ' ' + rWO.CandidateFullName.PersonName.LastName.__text
    //+ rWO.CandidateFullName.PersonName.NamePrefix.__text
    $scope.randomWoman = randomWoman;
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
