myApp.config(function ($routeProvider, $httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('interceptor');
    $routeProvider
        .when("/", {
            templateUrl: "web/pages/home/home.html",
            controller: homeCtrl
        })
        .when("/product-detail/:productId", {
            templateUrl: "web/pages/product-detail/product-detail.html",
            controller: productDetailCtrl
        })
        .when("/checkout", {
            templateUrl: "web/pages/checkout/checkout.html",
            controller: checkoutCtrl
        })
        .otherwise({
            redirectTo: "/"
        });
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: true
    // });
});

myApp.controller('myCtrl', ($scope, $cookies, jwtHelper, authService) => {
    let token = $cookies.get("refresh_token");
    if (token)
        $scope.user = jwtHelper.decodeToken(token);
    $scope.loader = document.querySelector("#loader");
    $scope.notify = {
        data: [],
        not: {
            type: 'success',
            message: 'Hello',
            position: '-translate-x-[350px]',
            scale: 'scale-[1]'
        },
        create: function (not) {
            this.setScale();

            this.not.type = not.type;
            this.not.message = not.message;


            let notCopy = angular.copy(this.not);
            this.data.push(notCopy);

            this.setPosition(notCopy);
        },
        setScale: function () {
            let s = 1;
            for (i = this.data.length - 1; i >= 0; i--) {
                s -= 0.02;
                this.data[i].scale = `scale-[${s}]`
            }
        },
        setPosition: function (not) {
            setTimeout(() => {
                not.position = 'translate-x-[0]';
                $scope.$apply();
            }, 1)

            setTimeout(() => {
                not.position = '-translate-x-[350px]';
                $scope.$apply();
            }, 4000)

            setTimeout(() => {
                this.data.shift();
                $scope.$apply();
            }, 5000);
        }
    };
    $scope.cart = {
        data: [],
        add: function (cartItem) {
            let {product} = cartItem;
            let existingProduct = this.data.find(c => c.product.id === product.id);
            if (existingProduct) {
                $scope.notify.create({
                    type: "warning",
                    message: "Product " + product.title + product.id + " existed in cart"
                });
            } else {
                this.data.push(cartItem);

                $scope.notify.create({
                    type: "success",
                    message: "Product " + product.name + product.id + " has already been added to cart"
                });
            }

        },
        delete: function (index) {
            this.data.splice(index, 1);
        },
        getTotal: function () {
            let total = 0;
            for (i = 0; i < this.data.length; i++) {
                total += this.data[i].product.price * this.data[i].quantity;
            }
            return total;
        },
        increase: function (index) {
            if (index !== -1) {
                this.data[index].quantity += 1;
            }
        },
        decrease: function (index) {
            if (index !== -1 && this.data[index].quantity > 1) {
                this.data[index].quantity -= 1;
            }
        },
    };
    $scope.products = [];
    $scope.product = {};
});