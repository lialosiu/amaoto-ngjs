export class AmaotoCoreService {

    constructor($log, toastr, $http, $mdDialog, $timeout) {
        'ngInject';
        this.$log = $log;
        this.$http = $http;
        this.toastr = toastr;
        this.$timeout = $timeout;

        this.amaotoCoreHost = 'http://amaoto-core.localhost/';
        this.site_name = undefined;
        this.powered_name = undefined;
        this.version = undefined;

        this.getSystemInfo().then((rsp)=> {
            toastr.info("Connected.");
            $timeout(()=> {
                toastr.info("Version " + rsp.data.version)
            }, 1000);
        }).catch((e)=> {
            $log.error(e);
            $mdDialog.show($mdDialog.alert({
                title: '连接服务器失败',
                content: e.data.message,
                ok: '确认'
            }));
        });
    }

    getSystemInfo() {
        return this.$http.get(this.amaotoCoreHost + 'api/system/info')
            .then((response)=> {
                let rsp = angular.fromJson(response.data);
                this.site_name = rsp.data.site_name;
                this.powered_name = rsp.data.powered_name;
                this.version = rsp.data.version;
                return rsp;
            });
    }

    getUserPaginate(page = 1, num = 15) {
        return this.$http.get(this.amaotoCoreHost + 'api/user/paginate' + '?page=' + page + '&num=' + num)
            .then((response)=> {
                let rsp = angular.fromJson(response.data);
                this.$log.debug(rsp);
                return rsp;
            });
    }

    getFilePaginate(page = 1, num = 15) {
        return this.$http.get(this.amaotoCoreHost + 'api/file/paginate' + '?page=' + page + '&num=' + num)
            .then((response)=> {
                let rsp = angular.fromJson(response.data);
                this.$log.debug(rsp);
                return rsp;
            });
    }
}
