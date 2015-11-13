export function UserMenuDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/directive/userMenu/userMenu.html',
        scope: {
            creationDate: '='
        },
        controller: UserMenuController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

class UserMenuController {
    constructor($state, $amaotoCore) {
        'ngInject';

        this.$state = $state;
        this.$amaotoCore = $amaotoCore;
    }

    changeState() {

    }

}
