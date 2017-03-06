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

    $scope.peiling = peilingen[party];

    for (var i = 0; i < candidateList.length; i++) {
      if(candidateList[i].Gender == 'female' && candidateList[i].CandidateIdentifier._Id < 41) {
        womenOfSelectedParty.push(candidateList[i]);
        }
    }

    var rWO = womenOfSelectedParty[Math.floor(Math.random() * womenOfSelectedParty.length)];
    console.log('rWO = ', rWO);
    var randomWoman = rWO.CandidateFullName.PersonName.FirstName.__text + ' ' + rWO.CandidateFullName.PersonName.LastName.__text;
    //+ rWO.CandidateFullName.PersonName.NamePrefix.__text
    $scope.randomWoman = randomWoman;
    $scope.website = rWO.website;
    $scope.plek = rWO.CandidateIdentifier._Id;
    console.log('$scope.randomWoman = ', $scope.randomWoman);

    if($scope.plek > $scope.peiling) {
      $scope.nuttig = 1;
    }
    else {
      $scope.nuttig = 0;
    }

    console.log('$scope.nuttig = ', $scope.nuttig);


  };

  function handleSuccess(response) {
    $scope.loading = '';
    $scope.affiliation = response.data.EML.CandidateList.Election.Contest.Affiliation;
  };

  function handleError(error) {
    console.log( error);
  };


  var peilingen = {
    "VVD": 27,
    "PvdA": 14,
    "PVV": 27,
    "SP": 14,
    "CDA": 19,
    "D66": 18,
    "CU": 7,
    "GroenLinks": 17,
    "SGP": 5,
    "PvdD": 6,
    "50Plus": 7,
    "OndernemersPartij": 0,
    "VNL": 1,
    "Denk": 2,
    "Nieuwe Wegen": "geen",
    "FvD": 2,
    "DBB": 0,
    "VP": 0,
    "GP": 0,
    "Piraten Partij": 0,
    "Artikel1": 0,
    "Niet Stemmers": 0,
    "LP": 0,
    "LidK": 0
  }

});

$( document ).ready(function(){
  $(".button-collapse").sideNav();
  $('.scrollspy').scrollSpy();
  $('select').material_select();
});
