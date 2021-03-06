export class FileListController {
    constructor($log, toastr, $amaotoCore, $state, $mdDialog) {
        'ngInject';

        this.$log = $log;
        this.toastr = toastr;
        this.$amaotoCore = $amaotoCore;
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

    changePage(page = 1, perPage = this.table.perPage) {
        return this.$amaotoCore.getFilePaginate(page, perPage).then((rsp)=> {
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
            templateUrl: 'app/dialog/uploader/file/file.html',
            controller: 'Dialog_FileUploaderDialogController',
            controllerAs: 'vm',
            //parent: angular.element(ev.target),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    }
}
