export class FileUploaderDialogController {
    constructor($mdDialog, $state, $amaotoCore, $log, $timeout, Upload, $http) {
        'ngInject';

        this.$mdDialog = $mdDialog;
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
                url: self.$amaotoCore.url(self.$amaotoCore.API_POST_FILE_UPLOAD),
                data: {
                    'file': file.data,
                    'uniName': file.uniName
                },
                resumeSizeUrl: self.$amaotoCore.url(self.$amaotoCore.API_GET_FILE_UPLOADED_SIZE + '?uniName=' + file.uniName),
                resumeChunkSize: '2MB'
            }).then(function (resp) {
                // Success
                self.$log.debug(resp);
                file.uploaded = resp.data.data;
                file.status = 'uploaded.file';
            }, (resp) => {
                // Fail
                self.$log.debug(resp);
            }, (evt) => {
                // Progress
                file.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
            });
        }
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}
