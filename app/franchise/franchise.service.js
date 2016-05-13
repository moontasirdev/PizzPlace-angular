/// <reference path="../../Scripts/angular.js" />
/// <reference path="../../Scripts/underscore.js" />

(function () {
    "use strict";

    window.angular.module("franchise-service", []).
        service("franchiseService", function () {
            var self = this;

            self.franchises = [
                {
                    name: 'Pizza Place Queens NYC',
                    location: {
                        code: 'NYC',
                        name: 'New York'
                    }
                },
                {
                    name: 'Pizza Place Brooklane NYC',
                    location: {
                        code: 'NYC',
                        name: 'New York'
                    }
                },
                 {
                     name: 'Pizza Place CC',
                     location: {
                         code: 'CC',
                         name: 'Chicago'
                     }
                 },
                  {
                      name: 'Pizza Place SFC',
                      location: {
                          code: 'SFC',
                          name: 'San Francisco'
                      }
                  }
            ];
        }
    ).factory("franchiseResource", ["franchiseService",
        function (franchiseService) {
            return {
                getFranchiseByLocation: function (locationCode) {
                    var result = [];
                    _.each(franchiseService.franchises, function(franchise) {
                        if (franchise.location.code == locationCode) {
                            result.push(franchise);
                        }
                    });
                    return result;
                },
                getAllDistinctLocation: function() {
                    var result = [],
                        found;
                    _.each(franchiseService.franchises, function (franchise) {
                        found = _.findWhere(result, { code: franchise.location.code });
                        if (!found) result.push(franchise.location);
                    });
                    return result;
                }
            };
        }
    ]);
}());
