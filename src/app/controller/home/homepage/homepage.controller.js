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

        $amaotoCore.getAlbumPaginate(1, 12).then((rsp)=> {
            this.albums = rsp.data.data;
            this.$log.debug(this.albums);
        });

        $amaotoCore.getMusicPaginate(1, 12).then((rsp)=> {
            this.musics = rsp.data.data;
            this.$log.debug(this.musics);
        });
    }


}
