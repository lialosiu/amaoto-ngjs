export class MusicListController {
    constructor($log, toastr, $amaotoCore, $state, $mdDialog) {
        'ngInject';

        this.$log = $log;
        this.toastr = toastr;
        this.$amaotoCore = $amaotoCore;
        this.$state = $state;
        this.$mdDialog = $mdDialog;

        this.list = undefined;
        this.page = undefined;
        this.perPage = undefined;
        this.lastPage = undefined;

        this.changePage(1, 15);
    }

    changePage(page = 1, perPage = this.perPage) {
        this.$amaotoCore.getMusicPaginate(page, perPage).then((rsp)=> {
            let lists = rsp.data;

            this.list = lists.data;
            this.page = lists.current_page;
            this.perPage = lists.per_page;
            this.lastPage = lists.last_page;
        });
    }

    prevPage() {
        if (this.page <= 1)
            this.toastr.error('已经是第一页');
        else
            this.changePage(this.page - 1)
    }

    nextPage() {
        if (this.page >= this.lastPage)
            this.toastr.error('已经是最后一页');
        else
            this.changePage(this.page + 1)
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

    //showPreviewImageDialog(ev, imageSrc) {
    //    this.$mdDialog.show({
    //        template: '<img src="' + imageSrc + '" width="100%">',
    //        controller: ()=> {
    //        },
    //        controllerAs: 'vm',
    //        //parent: angular.element(ev.target),
    //        targetEvent: ev,
    //        clickOutsideToClose: true
    //    });
    //}
}
