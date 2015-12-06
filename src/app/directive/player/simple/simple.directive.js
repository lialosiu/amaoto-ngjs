export function SimplePlayerDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/directive/player/simple/simple.html',
        scope: {
            creationDate: '='
        },
        controller: SimplePlayerController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

class SimplePlayerController {
    constructor($state, $amaotoCore) {
        'ngInject';

        this.$state = $state;
        this.$amaotoCore = $amaotoCore;
    }
}
