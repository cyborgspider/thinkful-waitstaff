angular.module('calcApp',[])
  .controller('calcCtrl', function($scope){
    $scope.submitted = false;

    $scope.data ={
      base_price:           0,
      tax_rate:             0,
      tip_percentage:       0,
      tip:                  0,
      tip_total:            0,
      tip_collection:       [],
      meal_count:           0,
      customer_subtotal:    0,
      meal_total:           0,
      average_tip_per_meal: 0
    };

    $scope.calcCustomerCharge = function(){
      if($scope.priceForm.$valid){
        $scope.calcSubTotal();
        $scope.increaseMealCount();
        $scope.calcTip();
        $scope.calcMealTotal();
        $scope.updateTipCollection();
        $scope.calcTotalTip();
        $scope.calcAverageTip();
        $scope.data.base_price     = 0;
        $scope.data.tip_percentage = 0;
      }
    };

    $scope.calcSubTotal = function(){
      $scope.data.customer_subtotal = $scope.data.base_price + (10 * ($scope.data.tax_rate/100));
    };

    $scope.increaseMealCount = function(){
      $scope.data.meal_count = $scope.data.meal_count+1;
    };

    $scope.calcMealTotal = function(){
      $scope.data.meal_total = $scope.data.base_price + (10 * ($scope.data.tax_rate/100)) + $scope.data.tip;
    };

    $scope.updateTipCollection = function(){
      $scope.data.tip_collection.push($scope.data.tip);
    };

    $scope.calcTip = function(){
      $scope.data.tip = $scope.data.base_price * ($scope.data.tip_percentage/100);
    };

    $scope.calcTotalTip = function(){
      //For John, why doesn't the commented part down there work?
      var total = 0;
      for(var i=0, len = $scope.data.tip_collection.length ; i < len; i++){
        // $scope.data.tip_total += $scope.data.tip_collection[i];
        total += $scope.data.tip_collection[i];
      }
      $scope.data.tip_total = total;
    };

    $scope.calcAverageTip = function(){
      $scope.data.average_tip_per_meal = ($scope.data.tip_total/$scope.data.tip_collection.length);
    };

    $scope.submitForm = function(){
        $scope.submitted = true;
        $scope.calcCustomerCharge();
    };

    $scope.cancelInfo = function(){
      $scope.submitted = false;
      $scope.priceForm.$setPristine();
    };

    $scope.resetApp = function(){
      $scope.data      = {};
      $scope.submitted = false;
      $scope.priceForm.$setPristine();
    };

    $scope.checkRequired = function(formItemName){
      return $scope.$eval('submitted && priceForm.'+formItemName+'.$error.required');
    };

    $scope.checkMin = function(formItemName){
      return $scope.$eval('submitted && priceForm.'+formItemName+'.$error.min');
    };

  });
