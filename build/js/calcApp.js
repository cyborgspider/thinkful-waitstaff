angular.module('calcApp',[])
  .controller('calcCtrl', function($scope){
    $scope.submitted = false;

    var data = $scope.data ={
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

    var calcCustomerCharge = function(){
      if($scope.priceForm.$valid){
        $scope.submitted = false;
        calcSubTotal();
        increaseMealCount();
        calcTip();
        calcMealTotal();
        updateTipCollection();
        calcTotalTip();
        calcAverageTip();
        data.base_price = 0;
        data.tip_percentage = 0;
      }
    };

    var calcSubTotal =function(){
      data.customer_subtotal = data.base_price + (10 * (data.tax_rate/100));
    };

    var increaseMealCount = function(){
      data.meal_count += 1;
    };

    var calcMealTotal = function(){
      data.meal_total = data.base_price + (10 * (data.tax_rate/100)) + data.tip;
    };

    var updateTipCollection = function(){
      data.tip_collection.push(data.tip);
    };

    var calcTip = function(){
      data.tip = data.base_price * (data.tip_percentage/100);
    };

    var calcTotalTip = function(){
      //For Jon, why doesn't the commented part down there work?
      var total = 0;
      for(var i=0, len = data.tip_collection.length ; i < len; i++){
        // data.tip_total += data.tip_collection[i];
        total += data.tip_collection[i];
      }
      data.tip_total = total;
    };

    var calcAverageTip = function(){
      data.average_tip_per_meal = (data.tip_total/data.tip_collection.length);
    };

    $scope.submitForm = function(){
        $scope.submitted = true;
        calcCustomerCharge();
    };

    $scope.cancelInfo = function(){
      $scope.submitted    = false;
      data.base_price     = 0;
      data.tax_rate       = 0;
      data.tip_percentage = 0;
    };

    $scope.resetApp = function(){
      data      = {};
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
