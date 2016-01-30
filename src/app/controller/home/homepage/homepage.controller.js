export class HomapageController {
    constructor($log, toastr, $timeout, $state, $amaotoCore, $amaotoPlayer, $window) {
        'ngInject';

        this.$log = $log;
        this.toastr = toastr;
        this.$timeout = $timeout;
        this.$state = $state;
        this.$amaotoCore = $amaotoCore;
        this.$amaotoPlayer = $amaotoPlayer;
        this.$window = $window;

        $amaotoCore.getAmaotoFlow().then((rsp)=> {
            this.amaotoFlow = rsp.data;
        });
    }


}
