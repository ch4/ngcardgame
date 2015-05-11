'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
      var suits = ['Clubs','Spades','Hearts','Diamonds'];
      var numbers = ['Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack','Queen','King','Ace']
      //var suits = ['Clubs','Spades'];
      //var numbers = ['Two','Three'];
      var deck = [];
      $scope.board = [];

      var firstCard = undefined;
      var secondCard = undefined;
      $scope.matchedPairs = [];

      function initDeck(){
        $scope.deck = [];
        for(var j = 0; j < suits.length; j=j+1){
          for(var i = 0; i < numbers.length; i=i+1){
            deck.push({
              suit:suits[j],
              number:numbers[i],
              status:'enabled'
            });
          }
        }
      }

      function initBoard(){
        $scope.board = [];
        var cardCount = suits.length * numbers.length;

        $scope.board = _.sample(deck,cardCount);
        console.log($scope.board);
      }

      function pickCard(boardNum){
        console.log('Picked ', $scope.board[boardNum]);

        if(firstCard != undefined && secondCard != undefined) {
          //reset picked cards
          if($scope.board[firstCard].number == $scope.board[secondCard].number){
            //cards match
            console.log('cards match');
            //$scope.matchedPairs.push([$scope.board[firstCard],$scope.board[secondCard]]);
            //delete $scope.board[firstCard];
            //delete $scope.board[secondCard];
            $scope.board[firstCard].status = 'disabled';
            $scope.board[secondCard].status = 'disabled';
            //$scope.$apply();
          } else {
            //cards don't match
            console.log('no match');
            $scope.board[firstCard].status = 'enabled';
            $scope.board[secondCard].status = 'enabled';
          }

          firstCard = undefined;
          secondCard = undefined;
        }

        if(firstCard == undefined) {
          //this is the first card
          firstCard = boardNum;
          $scope.board[boardNum].status = 'disabled';

        } else {
          //this is the second card to be picked
          secondCard = boardNum;
          $scope.board[boardNum].status = 'disabled';
          if($scope.board[firstCard].number == $scope.board[secondCard].number) {
            //cards match
            console.log('cards match');
            $scope.matchedPairs.push([$scope.board[firstCard], $scope.board[secondCard]]);
          }
        }

        if($scope.matchedPairs.length == (suits.length * numbers.length)/2){
          //game over
          console.log('Game Over');
          alert('Game Over');
        }
      }

      function nextTurn(){

      }

      initDeck();
      initBoard();

      $scope.pickCard = function(boardIndex){
        //console.log(boardIndex);
        pickCard(boardIndex);
      };
}]);