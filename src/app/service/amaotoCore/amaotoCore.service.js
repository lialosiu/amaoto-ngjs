export class AmaotoCoreService {
    constructor($log, $http) {
        'ngInject';
        this.$log = $log;
        this.$http = $http;
        this.amaotoCoreHost = 'http://amaoto.homestead/';
    }

    getSystemInfo() {
        return this.$http.get(this.amaotoCoreHost + 'api/system/info')
            .then((response)=> {
                return angular.fromJson(response.data);
            })
            .catch((error) => {
                this.$log.error(angular.fromJson(error.data));
            })
    }
}
