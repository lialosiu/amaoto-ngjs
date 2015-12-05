export function runBlock($log, $amaotoCore, $rootScope, $state, $window) {
    'ngInject';
    let deregistrationCallback = $rootScope.$on('$stateChangeStart', (e, toState) => {
        let cases = [];
        {
            let lastPos = toState.name.indexOf('.');
            while (lastPos != -1) {
                let thisStateName = toState.name.substring(0, lastPos);
                let state = $state.get(thisStateName);
                if (state && state.event && state.event.$stateChangeStart)
                    for (let thisCase of state.event.$stateChangeStart)
                        if ($window.jQuery.inArray(thisCase, cases) == -1)
                            cases.push(thisCase);
                lastPos = toState.name.indexOf('.', lastPos + 1);
            }
            let state = toState;
            if (state && state.event && state.event.$stateChangeStart)
                for (let thisCase of state.event.$stateChangeStart)
                    if ($window.jQuery.inArray(thisCase, cases) == -1)
                        cases.push(thisCase);
        }

        for (let thisCase of cases) {
            switch (thisCase) {
                case 'NotAdminRedirectToSignIn':
                    if (!$amaotoCore.localData.currentUser.isSignedIn) {
                        e.preventDefault();
                        $state.go('auth.sign-in');
                    }
                    break;
            }
        }
        //$log.debug(toState);
        //$log.debug('^toState');
        //$log.debug(toParams);
        //$log.debug('^toParams');
        //$log.debug(fromState);
        //$log.debug('^fromState');
        //$log.debug(fromParams);
        //$log.debug('^fromParams');
    });
    $rootScope.$on('$destroy', deregistrationCallback);
    $amaotoCore.xdebug(13495);
    $log.debug('runBlock end');
}
