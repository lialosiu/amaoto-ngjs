export function runBlock($log, $amaotoCore, $rootScope, $state) {
    'ngInject';

    let deregistrationCallback = $rootScope.$on('$stateChangeStart', (evt, toState) => {
        let middleware = toState.data ? toState.data.middleware : [];
        for (let thisMiddleware of middleware) {
            switch (thisMiddleware) {
                case 'admin':
                    if (!$amaotoCore.localData.currentUser.isSignedIn || !$amaotoCore.localData.currentUser.isAdministrator) {
                        $amaotoCore.getCurrentUser().then(()=> {
                            if (!$amaotoCore.localData.currentUser.isSignedIn || !$amaotoCore.localData.currentUser.isAdministrator) {
                                $state.go('auth.sign-in');
                                evt.preventDefault();
                            }
                        });
                    }
                    break;
            }
        }
    });

    $rootScope.$on('$destroy', deregistrationCallback);

    //$amaotoCore.xdebug(19943);
    $log.debug('runBlock end');
}
