export class HomepageController {
    constructor($log, toastr, $timeout, $amaotoCore) {
        'ngInject';

        this.$log = $log;
        this.toastr = toastr;
        this.$timeout = $timeout;
        this.$amaotoCore = $amaotoCore;
    }
}
