export class AlbumUploaderDialogController {
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

        this.form = {};
        this.form.musics = [];
        this.form.cover_thumbnail = 'assets/images/no-cover-300.jpg';
    }

    added() {
        this.$log.debug(this.addedFiles);
        if (!this.addedFiles) return;
        for (let addedFile of this.addedFiles) {
            let file = {};
            file.status = 'added';
            file.name = addedFile.name;
            file.size = addedFile.size;
            file.mime = addedFile.type;
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
                resumeChunkSize: '2MB',
                withCredentials: true
            }).then((resp) => {
                // Success
                self.$log.debug(resp);

                let data = resp.data.data;

                file.uploaded = data;

                let mimeP = undefined;
                if (data.mime)
                    mimeP = data.mime.substr(0, data.mime.indexOf('/'));
                else if (data.file && data.file.mime)
                    mimeP = data.file.mime.substr(0, data.file.mime.indexOf('/'));

                switch (mimeP) {
                    case 'audio':
                    case 'video':
                        file.status = 'uploaded.music';
                        angular.fromJson(file.uploaded.tags);
                        self.form.title = file.uploaded.album_title;
                        self.form.artist = file.uploaded.album_artist;
                        self.form.year = file.uploaded.year;
                        self.form.genre = file.uploaded.genre;
                        self.form.musics.push(file.uploaded.id);
                        if (!self.form.cover_image_id && file.uploaded.cover_image_id) {
                            self.form.cover_thumbnail = file.uploaded.show_thumbnail_cover_url;
                            self.form.cover_image_id = file.uploaded.cover_image_id;
                        }
                        break;
                    case 'image':
                        file.status = 'uploaded.image';
                        self.form.cover_thumbnail = file.uploaded.show_thumbnail_url;
                        self.form.cover_image_id = file.uploaded.id;
                        break;
                    default:
                        file.status = 'uploaded.file';
                }

            }, (resp) => {
                // Fail
                self.$log.debug(resp);
            }, (evt) => {
                // Progress
                file.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
            });
        }
    }

    submit() {
        let self = this;
        this.$amaotoCore.doPost(this.$amaotoCore.url(self.$amaotoCore.API_POST_ALBUM_CREATE), {
            title: self.form.title,
            artist: self.form.artist,
            year: self.form.year,
            genre: self.form.genre,
            cover_image_id: self.form.cover_image_id,
            musics: self.form.musics
        }, (rsp)=> {
            self.$log.debug(rsp);
            self.$mdDialog.show(this.$mdDialog.alert({
                title: '提示',
                content: rsp.data.message,
                ok: '确认'
            }));
            self.cancel();
            return rsp;
        });
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}
