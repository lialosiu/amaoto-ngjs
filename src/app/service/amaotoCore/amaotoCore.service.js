export class AmaotoCoreService {
    constructor($log, toastr, $http, $mdDialog, $timeout) {
        'ngInject';
        this.$log = $log;
        this.$http = $http;
        this.toastr = toastr;
        this.$timeout = $timeout;

        this.API_HOST = 'http://amaoto-core.localhost/';
        this.API_GET_SYSTEM_INFO = 'api/system/info';
        this.API_GET_USER_PAGINATE = 'api/user/paginate';
        this.API_GET_FILE_PAGINATE = 'api/file/paginate';
        this.API_POST_FILE_UPLOAD = 'api/file/upload';
        this.API_GET_FILE_UPLOADED_SIZE = 'api/file/uploaded-size';

        this.site_name = undefined;
        this.powered_name = undefined;
        this.version = undefined;
        this.xdebugKey = undefined;

        this.getSystemInfo().then((rsp)=> {
            toastr.info("Connected.");
            $timeout(()=> {
                toastr.info("Version " + rsp.data.version)
            }, 1000);
        }).catch((e)=> {
            $log.error(e);
            let message = '';
            if (e.data && e.data.message)
                message = e.data.message;
            else
                message = e.status;
            $mdDialog.show($mdDialog.alert({
                title: '连接服务器失败',
                content: message,
                ok: '确认'
            }));
        });
    }

    url(url) {
        url = this.API_HOST + url;
        if (this.xdebugKey) {
            if (url.indexOf('?') == -1)
                url = url + '?XDEBUG_SESSION_START=' + this.xdebugKey;
            else
                url = url + '&XDEBUG_SESSION_START=' + this.xdebugKey;
        }
        return url;
    }

    xdebug(key) {
        this.xdebugKey = key;
    }

    getSystemInfo() {
        return this.$http.get(this.url(this.API_GET_SYSTEM_INFO))
            .then((response)=> {
                let rsp = angular.fromJson(response.data);
                this.site_name = rsp.data.site_name;
                this.powered_name = rsp.data.powered_name;
                this.version = rsp.data.version;
                return rsp;
            });
    }

    getUserPaginate(page = 1, num = 15) {
        return this.$http.get(this.url(this.API_GET_USER_PAGINATE + '?page=' + page + '&num=' + num))
            .then((response)=> {
                let rsp = angular.fromJson(response.data);
                this.$log.debug(rsp);
                return rsp;
            });
    }

    getFilePaginate(page = 1, num = 15) {
        return this.$http.get(this.url(this.API_GET_FILE_PAGINATE + '?page=' + page + '&num=' + num))
            .then((response)=> {
                let rsp = angular.fromJson(response.data);
                this.$log.debug(rsp);
                return rsp;
            });
    }
}
