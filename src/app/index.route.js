export function routerConfig($stateProvider, $urlRouterProvider) {
    'ngInject';
    $stateProvider
        .state('homepage', {
            url: '/',
            views: {
                'top.frame': {
                    templateUrl: 'app/controller/homepage/homepage.html',
                    controller: 'HomepageController',
                    controllerAs: 'homepage'
                }
            }
        })
        .state('auth', {
            url: '/auth',
            views: {
                'top.frame': {
                    templateUrl: 'app/view/auth.html',
                    controller: 'AuthController',
                    controllerAs: 'vm'
                }
            },
            abstract: true
        })
        .state('auth.sign-in', {
            url: '/sign-in',
            views: {
                'auth.frame': {
                    templateUrl: 'app/view/auth/sign-in.html',
                    controller: 'Auth_SignInController',
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
                    controllerAs: 'console'
                }
            },
            event: {
                '$stateChangeStart': [
                    'NotAdminRedirectToSignIn'
                ]
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
                    templateUrl: 'app/controller/console/file/list/list.html',
                    controller: 'Console_FileListController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('console.image', {
            url: '/image',
            views: {
                'console.frame@console': {
                    template: '<div ui-view="console.image.frame">'
                }
            },
            abstract: true
        })
        .state('console.image.list', {
            url: '/list',

            views: {
                'console.image.frame@console.image': {
                    templateUrl: 'app/controller/console/image/list/list.html',
                    controller: 'Console_ImageListController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('console.music', {
            url: '/music',
            views: {
                'console.frame@console': {
                    template: '<div ui-view="console.music.frame">'
                }
            },
            abstract: true
        })
        .state('console.music.list', {
            url: '/list',

            views: {
                'console.music.frame@console.music': {
                    templateUrl: 'app/controller/console/music/list/list.html',
                    controller: 'Console_MusicListController',
                    controllerAs: 'vm'
                }
            }
        })
    ;

    $urlRouterProvider.otherwise('/');
}
