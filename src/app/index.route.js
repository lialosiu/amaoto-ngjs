export function routerConfig($stateProvider, $urlRouterProvider) {
    'ngInject';
    $stateProvider
        .state('main', {
            url: '/main',
            views: {
                'top.frame': {
                    templateUrl: 'app/main/main.html',
                    controller: 'MainController',
                    controllerAs: 'main'
                }
            }
        })
        .state('homepage', {
            url: '/',
            views: {
                'top.frame': {
                    templateUrl: 'app/controller/homepage/homepage.html',
                    controller: 'HomepageController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('console', {
            url: '/console',
            views: {
                'top.frame': {
                    templateUrl: 'app/controller/console/console.html',
                    controller: 'ConsoleController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('console.user', {
            url: '/user',
            views: {
                'console.frame@console': {
                    template: '<div ui-view="console.user.frame">'
                }
            },
            abstract: true
        })
        .state('console.user.list', {
            url: '/list',

            views: {
                'console.user.frame@console.user': {
                    templateUrl: 'app/controller/console/user/list.html',
                    controller: 'Console_UserListController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('console.file', {
            url: '/file',
            views: {
                'console.frame@console': {
                    template: '<div ui-view="console.file.frame">'
                }
            },
            abstract: true
        })
        .state('console.file.list', {
            url: '/list',

            views: {
                'console.file.frame@console.file': {
                    templateUrl: 'app/controller/console/file/list.html',
                    controller: 'Console_FileListController',
                    controllerAs: 'vm'
                }
            }
        })
    ;

    $urlRouterProvider.otherwise('/');
}
