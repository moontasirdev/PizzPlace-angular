/// <reference path="../../Scripts/angular.js" />
/// <reference path="../../Scripts/underscore.js" />

(function () {
    "use strict";

    window.angular.module("cart-service", []).
        service("orderService", function () {
            var self = this;
                
            self.cart = {
                totalPrice: 0,
                orders: []
            };

            self.generateKey = function() {
                if (self.cart.orders.length == 0) {
                    return 1;
                }
                else {
                    return self.cart.orders[self.cart.orders.length - 1].id + 1;
                }
            };

            self.getTotalUnitPrice = function (pizza) {
                var  itemPrice = 0.0;
                _.each(pizza.toppings, function (toping) {
                    if (toping.selected) {
                        itemPrice += toping.price;
                    }
                });

                return pizza.basePrice + itemPrice;
            };

            self.updateTotalPice = function() {
                var total = 0.0;
                _.each(self.cart.orders, function (o) {
                    total += o.subTotal;
                });
                self.cart.totalPrice = total;
            };

            self.clearCart = function () {
                self.cart.totalPrice = 0;
                self.cart.orders.length = 0;
            };

            self.AddItem = function (pizza, quantiy) {
                var untPrice = 0.0,
                    sbTotal = 0.0;
                untPrice = self.getTotalUnitPrice(pizza);
                sbTotal = untPrice * quantiy;
                self.cart.orders.push({
                    id: self.generateKey(),
                    item: pizza,
                    itemQuantiy: quantiy,
                    unitPrice: untPrice,
                    subTotal: sbTotal
                });
                self.updateTotalPice();
            };
            self.removeItem = function (orderId) {
                var index = _.findIndex(self.cart.orders, { id: orderId });;
                if (index > -1) {
                    self.cart.orders.splice(index, 1);
                    self.updateTotalPice();
                }
            };
        }
    );
}());
