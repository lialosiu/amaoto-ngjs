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
    constructor($state, $amaotoCore, $attrs, $log, ngAudio, $scope) {
        'ngInject';

        this.$state = $state;
        this.$amaotoCore = $amaotoCore;
        this.$attrs = $attrs;
        this.ngAudio = ngAudio;
        this.player = undefined;

        let self = this;
        $attrs.$observe('ngSrc', function (v) {
            $log.debug(v);
            self.player = ngAudio.load(v, $scope);
        });
    }
}
