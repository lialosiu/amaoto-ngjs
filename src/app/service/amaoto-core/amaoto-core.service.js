export class AmaotoCoreService {
    constructor($log, toastr, $http, $mdDialog, $timeout) {
        'ngInject';
        this.$log = $log;
        this.$http = $http;
        this.toastr = toastr;
        this.$timeout = $timeout;
        this.$mdDialog = $mdDialog;

        this.API_HOST = 'http://amaoto-core.homestead.lialosiu.com/';
        this.API_GET_SYSTEM_INFO = 'api/system/info';
        this.API_POST_AUTH_SIGN_IN = 'api/auth/sign-in';
        this.API_GET_AUTH_CURRENT_USER = 'api/auth/current-user';
        this.API_GET_USER_PAGINATE = 'api/user/paginate';
        this.API_GET_FILE_PAGINATE = 'api/file/paginate';
        this.API_POST_FILE_UPLOAD = 'api/file/upload';
        this.API_GET_FILE_UPLOADED_SIZE = 'api/file/uploaded-size';
        this.API_GET_IMAGE_PAGINATE = 'api/image/paginate';
        this.API_POST_IMAGE_UPLOAD = 'api/image/upload';
        this.API_GET_IMAGE_UPLOADED_SIZE = 'api/image/uploaded-size';
        this.API_GET_MUSIC_PAGINATE = 'api/music/paginate';
        this.API_POST_MUSIC_UPLOAD = 'api/music/upload';
        this.API_GET_MUSIC_UPLOADED_SIZE = 'api/music/uploaded-size';
        this.API_GET_ALBUM_PAGINATE = 'api/album/paginate';
        this.API_POST_ALBUM_CREATE = 'api/album/create';


        this.xdebugKey = undefined;

        this.localData = {};
        this.localData.serverInfo = {};
        this.localData.serverInfo.siteName = "#SITE_NAME#";
        this.localData.serverInfo.poweredName = "#POWERED_NAME#";
        this.localData.serverInfo.version = "#VERSION#";
        this.localData.currentUser = {};
        this.localData.currentUser.username = "游客";
        this.localData.currentUser.isSignedIn = false;
        this.localData.currentUser.isMaster = false;
        this.localData.currentUser.isAdministrator = false;

        this.connectToServer().then(()=> {
            toastr.info("Connected.");
            $timeout(()=> {
                toastr.info("Version " + this.localData.serverInfo.version)
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

    doGet(url, thenCallback, catchCallback) {
        if (!thenCallback) {
            let self = this;
            thenCallback = (rsp)=> {
                self.$log.debug(rsp);
                self.$mdDialog.show(this.$mdDialog.alert({
                    title: '提示',
                    content: rsp.data.message,
                    ok: '确认'
                }));
                return rsp;
            }
        }
        if (!catchCallback) {
            let self = this;
            catchCallback = (e)=> {
                self.$log.debug(e);
                self.$mdDialog.show(this.$mdDialog.alert({
                    title: '提示',
                    content: e.status > 0 ? e.data.message : '连接服务器失败',
                    ok: '确认'
                }));
                return e;
            }
        }
        return this.$http.get(url)
            .then(thenCallback)
            .catch(catchCallback);
    }

    doPost(url, data, thenCallback, catchCallback) {
        if (!thenCallback) {
            let self = this;
            thenCallback = (rsp)=> {
                self.$log.debug(rsp);
                self.$mdDialog.show(this.$mdDialog.alert({
                    title: '提示',
                    content: rsp.data.message,
                    ok: '确认'
                }));
                return rsp;
            }
        }
        if (!catchCallback) {
            let self = this;
            catchCallback = (e)=> {
                self.$log.debug(e);
                self.$mdDialog.show(this.$mdDialog.alert({
                    title: '提示',
                    content: e.data.message,
                    ok: '确认'
                }));
                return e;
            }
        }
        return this.$http.post(url, data)
            .then(thenCallback)
            .catch(catchCallback);
    }

    connectToServer() {
        return this.getSystemInfo().then(()=> {
            return this.getCurrentUser().then();
        });
    }

    getSystemInfo() {
        return this.doGet(this.url(this.API_GET_SYSTEM_INFO), (response)=> {
            let rsp = angular.fromJson(response.data);
            this.localData.serverInfo.siteName = rsp.data.site_name;
            this.localData.serverInfo.poweredName = rsp.data.powered_name;
            this.localData.serverInfo.version = rsp.data.version;
            return rsp;
        });
    }

    doSignIn(loginId, password) {
        let self = this;
        return self.doPost(self.url(self.API_POST_AUTH_SIGN_IN), {
            'login_id': loginId,
            'password': password
        }, (response)=> {
            let result = angular.fromJson(response.data);
            let data = result.data;
            self.localData.currentUser.username = data.username;
            self.localData.currentUser.isSignedIn = true;
            self.localData.currentUser.isMaster = data.is_master;
            self.localData.currentUser.isAdministrator = data.is_administrator;
            self.toastr.info(result.message);
            self.toastr.info('已登录账号[' + self.localData.currentUser.username + ']');
            return response;
        });
    }

    getCurrentUser() {
        let self = this;
        return self.doGet(self.url(self.API_GET_AUTH_CURRENT_USER), (response)=> {
            let result = angular.fromJson(response.data);
            let data = result.data;
            if (data && data.username) {
                self.localData.currentUser.username = data.username;
                self.localData.currentUser.isSignedIn = true;
                self.localData.currentUser.isMaster = data.is_master;
                self.localData.currentUser.isAdministrator = data.is_administrator;
            } else {
                self.localData.currentUser.username = '游客';
                self.localData.currentUser.isSignedIn = false;
                self.localData.currentUser.isMaster = false;
                self.localData.currentUser.isAdministrator = false;
            }
            return response;
        });
    }

    getUserPaginate(page = 1, num = 15) {
        return this.doGet(this.url(this.API_GET_USER_PAGINATE + '?page=' + page + '&num=' + num), (response)=> {
            return angular.fromJson(response.data);
        });
    }

    getFilePaginate(page = 1, num = 15) {
        return this.doGet(this.url(this.API_GET_FILE_PAGINATE + '?page=' + page + '&num=' + num), (response)=> {
            return angular.fromJson(response.data);
        });
    }

    getImagePaginate(page = 1, num = 15) {
        return this.doGet(this.url(this.API_GET_IMAGE_PAGINATE + '?page=' + page + '&num=' + num), (response)=> {
            return angular.fromJson(response.data);
        });
    }

    getMusicPaginate(page = 1, num = 15) {
        return this.doGet(this.url(this.API_GET_MUSIC_PAGINATE + '?page=' + page + '&num=' + num), (response)=> {
            return angular.fromJson(response.data);
        });
    }

    getAlbumPaginate(page = 1, num = 15) {
        return this.doGet(this.url(this.API_GET_ALBUM_PAGINATE + '?page=' + page + '&num=' + num), (response)=> {
            this.$log.debug(response);
            return angular.fromJson(response.data);
        })
    }
}
