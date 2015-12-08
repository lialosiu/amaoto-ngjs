export function V2AmaotoPlayerDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/directive/player/amaoto/v2/v2.html',
        scope: {
            creationDate: '='
        },
        controller: V2AmaotoPlayerController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

class V2AmaotoPlayerController {
    constructor($state, $amaotoCore, $amaotoPlayer, $attrs, $log) {
        'ngInject';

        this.$state = $state;
        this.$amaotoCore = $amaotoCore;
        this.$amaotoPlayer = $amaotoPlayer;
        this.$attrs = $attrs;
        this.$log = $log;
    }
}
