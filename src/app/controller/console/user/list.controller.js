export class UserListController {
    constructor($log, toastr, $amaotoCore, $state) {
        'ngInject';

        this.$log = $log;
        this.toastr = toastr;
        this.$amaotoCore = $amaotoCore;
        this.$state = $state;

        this.list = undefined;
        this.page = undefined;
        this.perPage = undefined;
        this.lastPage = undefined;

        this.changePage(1, 15);
    }

    changePage(page = 1, perPage = this.perPage) {
        this.$amaotoCore.getUserPaginate(page, perPage).then((rsp)=> {
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
}
