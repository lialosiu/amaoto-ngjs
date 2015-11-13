export function routerConfig($stateProvider, $urlRouterProvider) {
    'ngInject';
    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        });

    $stateProvider
        .state('homepage', {
            url: '/',
            templateUrl: 'app/controller/homepage/homepage.html',
            controller: 'HomepageController',
            controllerAs: 'homepage'
        });

    $urlRouterProvider.otherwise('/');
}
