export function config($logProvider, toastrConfig, $mdThemingProvider, $httpProvider) {
    'ngInject';
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-bottom-left';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;

    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('indigo');

    $httpProvider.defaults.useXDomain = true;
    //$httpProvider.defaults.headers.common = 'Content-Type: application/json';
}
