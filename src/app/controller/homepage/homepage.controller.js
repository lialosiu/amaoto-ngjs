export class HomepageController {
    constructor($log, $mdToast, $amaotoCore) {
        'ngInject';

        this.$log = $log;
        this.$mdToast = $mdToast;
        this.$amaotoCore = $amaotoCore;
    }

    connectAmaotoCore() {
        this.$amaotoCore.getSystemInfo()
            .then((rsp)=> {
                this.$log.debug(rsp);
                this.$mdToast.showSimple(
                    this.$mdToast.simple()
                        .content(rsp.data.site_name)
                        .hideDelay(500)
                );
                this.$mdToast.show(
                    this.$mdToast.simple()
                        .content(rsp.data.powered_name)
                        .hideDelay(1000)
                );
                this.$mdToast.show(
                    this.$mdToast.simple()
                        .content(rsp.data.version)
                        .hideDelay(1500)
                );
            });

    }

}
