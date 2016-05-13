/// <reference path="../Scripts/angular.js" />
/// <reference path="cart/cart.service.js" />
/// <reference path="franchise/franchise.service.js" />
/// <reference path="product/product.service.js" />

(function() {
    "use strict";

    window.angular.module("app", ["franchise-service", "product-service", "cart-service"])
        .controller("mainCtrl",
        [
            "franchiseResource",
            "toppingResource",
            "pizzaResource",
            "orderService",
            "$scope",
            function (
                    franchiseResource,
                    toppingResource,
                    pizzaResource,
                    orderService,
                    $scope
                )
            {
                var vm = this;
                vm.title = "Test";
                vm.quantity = [];
                for (var i = 1; i <= 20; i++) {
                    vm.quantity.push({value: i});
                }

                vm.franchiseResource = franchiseResource;
                vm.toppingResource = toppingResource;
                vm.pizzaResource = pizzaResource;
                vm.orderService = orderService;

                vm.orderInfo = {
                    city: '',
                    pizzaQuantity: 1,
                    user: {}
                };

                vm.cartInfo = orderService.cart;

                vm.locations = franchiseResource.getAllDistinctLocation();
                vm.franchises = [];
                vm.toppings = [];
                vm.pizzas = [];

                vm.clearData = function() {
                    vm.toppings.length = 0;
                    vm.pizzas.length = 0;
                    vm.orderInfo.itemQuantiy = 1;
                    orderService.clearCart();
                };

                vm.getFranchisesByLocation = function (code) {
                    vm.franchises = franchiseResource.getFranchiseByLocation(code);
                    vm.clearData();
                };

                vm.getPizzasByFranchise = function (franchise) {
                    if (franchise)
                        vm.pizzas = pizzaResource.getBaseByFranchise(franchise);                    
                };

                vm.getToppingsByFranchiseAndPizza = function (franchise, pizza) {
                    if (pizza)
                        vm.toppings = toppingResource.getToppingsByFranchiseAndPizza(franchise, pizza);
                };

                vm.updateToppingToPizza = function (topping, pizza) {
                    if (pizza)
                        if (topping.selected) pizzaResource.addToppings(topping, pizza);                  
                };

                vm.addToCart = function (pizza, quantity) {
                    if (pizza) {
                        var tmp = angular.copy(pizza);
                        orderService.AddItem(tmp, quantity);
                    }
                };

                vm.submit = function(user) {
                    vm.message = 'Your order has been sucessfully placed!';
                };

                vm.reset = function (frm) {
                    frm.$setPristine();
                    vm.orderInfo.user = {};
                    vm.message = "";
                };
            }
        ]
    );
}());
