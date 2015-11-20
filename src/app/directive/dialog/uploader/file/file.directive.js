export function FileUploaderDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/directive/uploader/file/file.html',
        scope: {
            creationDate: '='
        },
        controller: FileUploaderController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

class FileUploaderController {
    constructor($state, $amaotoCore) {
        'ngInject';

        this.$state = $state;
        this.$amaotoCore = $amaotoCore;
    }
}
