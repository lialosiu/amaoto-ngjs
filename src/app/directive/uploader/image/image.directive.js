export function ImageUploaderDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/directive/uploader/image/image.html',
        scope: {
            creationDate: '='
        },
        controller: ImageUploaderController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

class ImageUploaderController {
    constructor($state, $amaotoCore, $log, $timeout, Upload, $http) {
        'ngInject';

        this.$state = $state;
        this.$amaotoCore = $amaotoCore;
        this.$log = $log;
        this.$timeout = $timeout;
        this.Upload = Upload;
        this.$http = $http;

        this.files = [];
        this.addedFiles = [];
    }

    added() {
        this.$log.debug(this.addedFiles);
        if (!this.addedFiles) return;
        for (let addedFile of this.addedFiles) {
            let file = {};
            file.status = 'added';
            file.name = addedFile.name;
            file.size = addedFile.size;
            file.mime = addedFile.mime;
            file.uploadProgress = 0;
            file.uniName = encodeURIComponent(file.name) + '-' + file.size + '-' + file.lastModified;
            file.data = addedFile;
            this.files.push(file);
        }
    }

    upload() {
        let self = this;
        for (let file of self.files) {
            if (file.status != 'added') continue;

            file.status = 'uploading';
            file.uploadProgress = 0;
            this.Upload.upload({
                url: self.$amaotoCore.url(self.$amaotoCore.API_POST_IMAGE_UPLOAD),
                data: {
                    'file': file.data,
                    'uniName': file.uniName
                },
                resumeSizeUrl: self.$amaotoCore.url(self.$amaotoCore.API_GET_IMAGE_UPLOADED_SIZE + '?uniName=' + file.uniName),
                resumeChunkSize: '2MB'
            }).then(function (resp) {
                // Success
                let data = resp.data.data;
                file.name = data.file.name;
                file.status = 'uploaded';
                file.mime = data.file.mime;
                self.$log.debug(resp);
            }, function (resp) {
                self.$log.debug(resp);
            }, function (evt) {
                file.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
            });
        }
    }
}