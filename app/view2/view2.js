'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', function($scope) {
      var suits = ['Clubs','Spades','Hearts','Diamonds'];
      var numbers = ['Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack','Queen','King','Ace']
      //var suits = ['Clubs','Spades'];
      //var numbers = ['Two','Three','Four','Five','Six'];
      var deck = [];
      $scope.board = [];

      var firstCard = undefined;
      var secondCard = undefined;
      $scope.matchedPairs = [];
      $scope.matchedPairs[0] = [];
      $scope.matchedPairs[1] = [];

      $scope.isHumanTurn = true;

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
            $scope.matchedPairs[0].push([$scope.board[firstCard], $scope.board[secondCard]]);
          } else {
            alert("Computer's Turn")
            $scope.board[firstCard].status = 'enabled';
            $scope.board[secondCard].status = 'enabled';
            nextTurn();
          }
        }

        if(($scope.matchedPairs[0].length + $scope.matchedPairs[1].length) == (suits.length * numbers.length)/2){
          //game over
          console.log('Game Over');
          alert('Game Over');
        }
      }

      function nextTurn(){
        firstCard = undefined;
        secondCard = undefined;
        $scope.isHumanTurn = !($scope.isHumanTurn);
        if(!($scope.isHumanTurn)){
          //computer's turn
          ComputerPlay();
        }
      }

      function ComputerPlay(){
        var pickedCard1 = undefined;
        while(pickedCard1 == undefined){
          var randomNum1 = Math.floor((Math.random() * $scope.board.length-1) + 1);
          if($scope.board[randomNum1].status != 'disabled'){
            pickedCard1 = randomNum1;
          }
        }

        var pickedCard2 = undefined;
        while(pickedCard2 == undefined){
          var randomNum2 = Math.floor((Math.random() * $scope.board.length-1) + 1);
          if($scope.board[randomNum2].status != 'disabled' && randomNum2 != randomNum1){
            pickedCard2 = randomNum2;
          }
        }

        console.log('Computer picked ',$scope.board[pickedCard1], $scope.board[pickedCard2]);

        if($scope.board[pickedCard1].number == $scope.board[pickedCard2].number){
          //computer matched
          $scope.matchedPairs[1].push([$scope.board[pickedCard1],$scope.board[pickedCard2]]);
          $scope.board[pickedCard1].status = 'disabled';
          $scope.board[pickedCard2].status = 'disabled';

          if(($scope.matchedPairs[0].length + $scope.matchedPairs[1].length) == (suits.length * numbers.length)/2){
            //game over
            console.log('Game Over');
            alert('Game Over');
          } else {
            //continue turn
            ComputerPlay();
          }
        } else {
          alert("Human's Turn");
          nextTurn();
        }

      };

      initDeck();
      initBoard();

      $scope.pickCard = function(boardIndex){
        //console.log(boardIndex);
        pickCard(boardIndex);
      };
}]);