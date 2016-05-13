/// <reference path="../../Scripts/angular.js" />
/// <reference path="../../Scripts/underscore.js" />

(function () {
    "use strict";

    window.angular.module("product-service", []).
        service("pizzaService", function() {
            var self = this;

            self.pizzas = [
                {
                    name: 'cheese',
                    type: 'cheese',
                    basePrice: 5.0,
                    toppings: [
                        {
                            
                        }
                    ]
                },
                {
                    name: 'veggie',
                    type: 'veggie',
                    basePrice: 6.0,
                    toppings: [
                        {
                            name: 'Mushrooms',
                            price: .5,
                            franchises: 'All',
                            selected: true
                        }
                    ]
                },
                {
                    name: 'meat',
                    type: 'meat',
                    basePrice: 7.0,
                    toppings: [
                        {
                            name: 'Pepperoni',
                            price: .5,
                            franchises: 'All',
                            selected: true
                        }
                    ]
                }
            ];
        }).
        factory("pizzaResource", ["pizzaService", function (pizzaService) {
            return {
                getBaseByFranchise: function (franchise) {
                    var pizzas = [],
                        tmp;
                    _.each(pizzaService.pizzas, function(pizza) {
                        tmp = angular.copy(pizza);
                        tmp.name = franchise.name + " " + tmp.name;
                        pizzas.push(tmp);
                    });

                    return pizzas;
                },
                addToppings: function(topping, pizza) {
                    var itemTopping = _.findWhere(pizza.toppings, { name: topping.name });
                    if (itemTopping) {
                        itemTopping.selected = true;
                    } else {
                        topping.selected = true;
                        pizza.toppings.push(topping);
                    }
                }
            };
        }]).
        service("toppingsService", function () {
            var self = this;

            self.toppings = [
                {
                    name: 'Mushrooms',
                    price: .29,
                    franchises: 'All',
                    selected: false
                },
                {
                    name: 'Pepperoni',
                    price: .23,
                    franchises: 'All',
                    selected: false
                },
                {
                    name: 'Italian Sausage',
                    price: .78,
                    franchises: 'NYC, CC',
                    selected: false
                },
                {
                    name: 'Beef',
                    price: .99,
                    franchises: 'SFC, CC',
                    selected: false
                },
                {
                    name: 'Feta Cheese',
                    price: .25,
                    franchises: 'CC',
                    selected: false
                },
                {
                    name: 'Black Olives',
                    price: .15,
                    franchises: 'NYC',
                    selected: false
                },
                {
                    name: 'Hot Sauce',
                    price: .25,
                    franchises: 'SFC',
                    selected: false
                }
            ];
        }
    ).factory("toppingResource", ["toppingsService",
        function (toppingsService) {
            return {
                getToppingsByFranchiseAndPizza: function (franchise, pizza) {
                    var result = [],
                        tmp;
                    _.each(toppingsService.toppings, function (topping) {
                        if (topping.franchises.indexOf('All') > -1 || topping.franchises.indexOf(franchise.location.code) > -1) {
                            tmp = angular.copy(topping);
                            if (pizza.toppings && 
                                pizza.toppings.length > 0 &&
                                tmp.name == pizza.toppings[0].name) {
                                tmp.selected = true;
                            }
                            result.push(tmp);
                        }
                    });
                    return result;
                }
            };
        }
    ]);
}());
