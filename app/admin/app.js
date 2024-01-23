var adminApp = angular.module('adminApp', ["ngRoute"]);

adminApp.config(["$routeProvider", "$locationProvider",function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/products", {
            templateUrl: "pages/products/products.html",
            controller: "productsCtrl"
        })
        .when("/product-detail", {
            templateUrl: "pages/product-detail/image-preview.html",
            controller: "productDetailCtrl"
        })
        .otherwise({
            redirectTo: "/products"
        });
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: true
    // });
}]);

adminApp.controller('adminCtrl', ($scope) => {
    $scope.user = null;
    $scope.products = [];
    $scope.product = {};
});