export class MusicListController {
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
        this.table.paginationLabel = {};
        this.table.paginationLabel.text = '每页行数';
        this.table.paginationLabel.of = '共';

        this.changePage(1, 15);

        this.onPaginationChange = (page, limit) => {
            return this.changePage(page, limit);
        };
    }

    changePage(page = 1, perPage = this.perPage) {
        this.$amaotoCore.getMusicPaginate(page, perPage).then((rsp)=> {
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
            templateUrl: 'app/dialog/uploader/music/music.html',
            controller: 'Dialog_MusicUploaderDialogController',
            controllerAs: 'vm',
            //parent: angular.element(ev.target),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    }

    showMusicEditorDialog(music, ev) {
        this.$mdDialog.show({
            templateUrl: 'app/dialog/editor/music/music.html',
            controller: 'MusicEditorDialogController',
            controllerAs: 'vm',
            //parent: angular.element(ev.target),
            targetEvent: ev,
            clickOutsideToClose: true,
            bindToController: true,
            locals: {
                music: music
            }
        });
    }

    showMusicDeleteDialog(music, ev) {
        let self = this;
        let confirm = self.$mdDialog.confirm()
            .title('删除确认')
            .content(music.title + '<br><small>' + music.artist + '</small>')
            .clickOutsideToClose(true)
            .targetEvent(ev)
            .ok('删除')
            .cancel('取消');
        self.$mdDialog.show(confirm).then(()=> {
            self.$amaotoCore.doPost(self.$amaotoCore.url(self.$amaotoCore.API_POST_MUSIC_DELETE, {musicId: music.id}), {});
        });
    }
}
