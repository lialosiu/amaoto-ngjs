export class HomepageController {
    constructor($log, toastr, $timeout, $amaotoCore, $amaotoPlayer) {
        'ngInject';

        this.$log = $log;
        this.toastr = toastr;
        this.$timeout = $timeout;
        this.$amaotoCore = $amaotoCore;
        this.$amaotoPlayer = $amaotoPlayer;

        $amaotoCore.getMusicPaginate().then((rsp)=>{
            let music = rsp.data.data[0];
            $log.debug(music);
            $amaotoPlayer.loadMusic(music);
        });
        //$amaotoPlayer
    }
}
