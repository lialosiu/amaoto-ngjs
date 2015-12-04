export class AuthController {
    constructor($log, toastr, $amaotoCore, $state) {
        'ngInject';

        this.$log = $log;
        this.toastr = toastr;
        this.$amaotoCore = $amaotoCore;
        this.$state = $state;
    }
}
