export class HomepageController {
    constructor($log, toastr, $timeout, $amaotoCore, $amaotoPlayer, $window) {
        'ngInject';

        this.$log = $log;
        this.toastr = toastr;
        this.$timeout = $timeout;
        this.$amaotoCore = $amaotoCore;
        this.$amaotoPlayer = $amaotoPlayer;
        this.$window = $window;
    }

    lll() {
        let self = this;
        this.$amaotoCore.getMusicPaginate().then((rsp)=> {
            let music = rsp.data.data[1];
            self.$log.debug(music);
            self.$log.debug(self.$amaotoPlayer.player);
            self.$amaotoPlayer.loadMusic(music);
        });
    }

    showP() {
        let audio = this.$amaotoPlayer.player.audio;
        this.$log.debug(this.$amaotoPlayer.player);
    }
}
