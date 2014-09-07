angular.module('calcApp',[])
  .controller('calcCtrl', function($scope){
    $scope.submitted = false;

    var data = $scope.data = {
      base_price:           0,
      tax_rate:             0,
      tip_percentage:       0,
      tip:                  0,
      tip_total:            0,
      tip_average:          0,
      meal_count:           0,
      customer_subtotal:    0,
      meal_total:           0
    };

    var calcCustomerCharge = function(){
      if($scope.priceForm.$valid){
        $scope.submitted = false;
        calcSubTotal();
        calcMealTotal();
        increaseMealCount();
        calcTip();
        calcTotalTip();
        calcTipAverage();
        data.base_price = 0;
        data.tip_percentage = 0;
      }
    };

    var calcSubTotal =function(){
      data.customer_subtotal = data.base_price + (data.base_price * (data.tax_rate/100));
    };

    var increaseMealCount = function(){
      data.meal_count += 1;
    };

    var calcMealTotal = function(){
      data.meal_total = data.base_price + (data.base_price * (data.tax_rate/100)) + data.tip;
    };


    var calcTip = function(){
      data.tip = data.base_price * (data.tip_percentage/100);
    };

    var calcTotalTip = function(){
      data.tip_total += data.tip;
    };

    var calcTipAverage = function(){
      data.tip_average = data.tip_total/data.meal_count;
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
      $scope.cancelInfo();
      data.tip               = 0;
      data.tip_total         = 0;
      data.tip_average       = 0;
      data.meal_count        = 0;
      data.customer_subtotal = 0;
      data.meal_total        = 0;
    };

    $scope.checkRequired = function(formItemName){
      return $scope.$eval('submitted && priceForm.'+formItemName+'.$error.required');
    };

    $scope.checkMin = function(formItemName){
      return $scope.$eval('submitted && priceForm.'+formItemName+'.$error.min');
    };

  });
