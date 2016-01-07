export function routerConfig($stateProvider, $urlRouterProvider) {
    'ngInject';
    $stateProvider
        .state('start', {
            url: '/',
            views: {
                'root.frame': {
                    templateUrl: 'app/controller/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'home'
                }
            }
        })
        .state('home', {
            url: '/home',
            views: {
                'root.frame': {
                    templateUrl: 'app/controller/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'home'
                }
            },
            abstract: true
        })
        .state('home.homepage', {
            url: '/homepage',
            views: {
                'home.frame': {
                    templateUrl: 'app/controller/home/homepage/homepage.html',
                    controller: 'HomepageController',
                    controllerAs: 'homepage'
                }
            }
        })
        .state('auth', {
            url: '/auth',
            views: {
                'root.frame': {
                    templateUrl: 'app/controller/auth/auth.html',
                    controller: 'AuthController',
                    controllerAs: 'auth'
                }
            },
            abstract: true
        })
        .state('auth.sign-in', {
            url: '/sign-in',
            views: {
                'auth.frame': {
                    templateUrl: 'app/controller/auth/sign-in/sign-in.html',
                    controller: 'Auth_SignInController',
                    controllerAs: 'signIn'
                }
            }
        })
        .state('console', {
            url: '/console',
            views: {
                'root.frame': {
                    templateUrl: 'app/controller/console/console.html',
                    controller: 'ConsoleController',
                    controllerAs: 'console'
                }
            },
            data: {
                middleware: [
                    'admin'
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
                    controllerAs: 'list'
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
                    controllerAs: 'list'
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
                    controllerAs: 'list'
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
                    controllerAs: 'list'
                }
            }
        })
        .state('console.album', {
            url: '/album',
            views: {
                'console.frame@console': {
                    template: '<div ui-view="console.album.frame">'
                }
            },
            abstract: true
        })
        .state('console.album.list', {
            url: '/list',

            views: {
                'console.album.frame@console.album': {
                    templateUrl: 'app/controller/console/album/list/list.html',
                    controller: 'Console_AlbumListController',
                    controllerAs: 'list'
                }
            }
        })

    ;

    $urlRouterProvider.otherwise('/');
}
