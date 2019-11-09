var app = angular.module('changeMachine', []);
app.controller('calculationAndDraw', function($scope) {
  $scope.denominations=[ 
    {
      name:"tenths",
      numOfCoins:0,
      value:0.1
    },
    {
      name:"fifths",
      numOfCoins:0,
      value:0.2
    },
    {
      name:"halfs",
      numOfCoins:0,
      value:0.5
    },
    {
      name:"ones",
      numOfCoins:0,
      value:1
    },
    {
      name:"twos",
      numOfCoins:0,
      value:2
    },
    {
      name:"fives",
      numOfCoins:0,
      value:5
    }
    
  ];
  $scope.amountGiven=0;
  $scope.rand=0;
     //A method for getting and setting the entered value with protection from non integer values
  $scope.getSet=function(event){
    var target=event.target;
    //console.log(event);
    //console.log($scope.denominations);
    for(var i=0;i<$scope.denominations.length;i++){
      if($scope.denominations[i].name==target.name)
      {
        $scope.denominations[i].numOfCoins=parseInt(target.value);
        break;
      }
    }
  }

  $scope.generateAmountDue=function(){
    var precision = 10; // 1 decimal
    var random = Math.floor(Math.random() * (1000 * precision - 1 * precision) + 1 * precision) / (1*precision);
    //console.log(random);
    $scope.rand=random;
    return random;
  }  

    
  var calculateChange=function(){
    var coinCountArray=[];
    /*console.log($scope.denominations);
      console.log($scope.denominations.length);
      console.log($scope.rand);
      console.log(coinCountArray);*/
    if($scope.rand<=$scope.amountGiven){
      var change=parseFloat(Math.round( $scope.amountGiven * 10) / 10)-(Math.round( $scope.rand * 10) / 10);
      var state=stateOfTheMachine()
      //console.log(state);
      if (state>=change) {
        for(var i=0;i<$scope.denominations.length;i++){
          var coin={name:$scope.denominations[i].name,value:0}
          coinCountArray.push(coin);
        }
        var change=parseFloat(Math.round( $scope.amountGiven * 10) / 10)-(Math.round( $scope.rand * 10) / 10);

        change=Math.round( change * 10) / 10;

        for(var i=$scope.denominations.length-1;i>=0;i--){
        // console.log($scope.denominations.length);
          //console.log($scope.denominations[i].numOfCoins);
          
          while($scope.denominations[i].numOfCoins>0&&$scope.denominations[i].value<=change){
            //console.log(coinCountArray);
            //console.log(change);
            change-= $scope.denominations[i].value;
            change=Math.round( change * 10) / 10;
            coinCountArray[i].value+=1;
            
            $scope.denominations[i].numOfCoins--;
          }
        }
        return coinCountArray;
      }
      else {
        return [{name:"We are sorry. We don't have enough money in our balance.", coin:""}]
      }
    }
    else {
      return [{ name:"You didn't give enough money.", coin:""}];
    }
    //console.log(coinCountArray);
    //console.log(change);
    //console.log($scope.denominations);
    
  }
  var stateOfTheMachine=function(){
    var sum=0;
    for (var i = 0; i < $scope.denominations.length; i++) {
      sum+=$scope.denominations[i].value*$scope.denominations[i].numOfCoins;
    }
    //console.log(sum)
    return parseFloat(sum);
  }
  $scope.drawResults=function(){
    var result=calculateChange();
    //console.log(result);
    return result;
  }
  var form=document.getElementsByClassName('setupForm');
  var button=document.getElementById("genButton");
  var button2=document.getElementById('mainSetup');
  $scope.display=function(){

   form[0].style.display='flex';
   var button=document.getElementById('setupButton').style.display="none";
    button2.style.display='inline';
  }                               /*Two functions are created so that you cannot reopen the setup untill you refresh the page */
  $scope.close=function(){
   form[0].style.display='none';
   button2.style.display='none';
  }
  $scope.displayPayment=function(){
    var paymentSpan=document.getElementById('payAmount');
    var paymentdiv=document.getElementById('paymentDue');
    paymentSpan.style.display="block";
    paymentdiv.style.display="block";
  }
  $scope.displayGenButton=function(){
    
    button.style.display="block";
  }
  $scope.closeGenButton=function(){
    button.style.display="none";
  }
});

