export class AlbumListController {
    constructor($log, toastr, $amaotoCore, $amaotoPlayer, $state, $mdDialog) {
        'ngInject';

        this.$log = $log;
        this.toastr = toastr;
        this.$amaotoCore = $amaotoCore;
        this.$amaotoPlayer = $amaotoPlayer;
        this.$state = $state;
        this.$mdDialog = $mdDialog;

        this.table = {};
        this.table.data = undefined;
        this.table.currentPage = undefined;
        this.table.perPage = undefined;
        this.table.lastPage = undefined;
        this.table.total = undefined;
        this.table.promise = undefined;

        this.changePage(1, 15);

        this.onPaginationChange = (page, limit) => {
            this.table.promise = this.changePage(page, limit);
        };
    }

    changePage(page = 1, perPage = this.perPage) {
        this.$amaotoCore.getAlbumPaginate(page, perPage).then((rsp)=> {
            let lists = rsp.data;

            this.table.data = lists.data;
            this.table.currentPage = lists.current_page;
            this.table.perPage = lists.per_page;
            this.table.lastPage = lists.last_page;
            this.table.total = lists.total;

            return rsp;
        });
    }


    showUploadDialog(ev) {
        this.$mdDialog.show({
            templateUrl: 'app/dialog/uploader/album/album.html',
            controller: 'Dialog_AlbumUploaderDialogController',
            controllerAs: 'vm',
            targetEvent: ev,
            clickOutsideToClose: false
        });
    }

    showAlbumEditorDialog(album, ev) {
        this.$mdDialog.show({
            templateUrl: 'app/dialog/editor/album/album.html',
            controller: 'AlbumEditorDialogController',
            controllerAs: 'vm',
            targetEvent: ev,
            clickOutsideToClose: true,
            bindToController: true,
            locals: {
                album: album
            }
        });
    }

    showAlbumUploadNewMusicDialog(album, ev) {
        this.$mdDialog.show({
            templateUrl: 'app/dialog/uploader/music/music.html',
            controller: 'Dialog_MusicUploaderDialogController',
            controllerAs: 'vm',
            targetEvent: ev,
            clickOutsideToClose: false,
            bindToController: true,
            locals: {
                album: album
            }
        });
    }
}
