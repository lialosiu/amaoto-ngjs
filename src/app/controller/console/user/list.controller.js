export class UserListController {
    constructor($log, toastr, $amaotoCore, $state) {
        'ngInject';

        this.$log = $log;
        this.toastr = toastr;
        this.$amaotoCore = $amaotoCore;
        this.$state = $state;

        this.table = {};
        this.table.data = undefined;
        this.table.currentPage = undefined;
        this.table.perPage = undefined;
        this.table.lastPage = undefined;
        this.table.total = undefined;
        this.table.promise = undefined;

        this.changePage(1, 15);

        this.onPaginationChange = (page, limit) => {
            return this.changePage(page, limit);
        };
    }

    changePage(page = 1, perPage = this.table.perPage) {
        this.$amaotoCore.getUserPaginate(page, perPage).then((rsp)=> {
            let lists = rsp.data;

            this.table.data = lists.data;
            this.table.currentPage = lists.current_page;
            this.table.perPage = lists.per_page;
            this.table.lastPage = lists.last_page;
            this.table.total = lists.total;

            return rsp;
        });
    }
}
