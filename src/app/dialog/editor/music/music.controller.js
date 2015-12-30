export class MusicEditorDialogController {
    constructor($mdDialog, $state, $amaotoCore, $log, $timeout, Upload, $http) {
        'ngInject';

        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.$amaotoCore = $amaotoCore;
        this.$log = $log;
        this.$timeout = $timeout;
        this.$http = $http;

        this.form = {};
        this.form.title = this.music.title;
        this.form.artist = this.music.artist;
        this.form.year = this.music.year;
        this.form.genre = this.music.genre;
    }

    submit() {
        let self = this;
        this.$amaotoCore.doPost(this.$amaotoCore.url(self.$amaotoCore.API_POST_MUSIC_EDIT + '/' + self.music.id), {
            title: self.form.title,
            artist: self.form.artist,
            year: self.form.year,
            genre: self.form.genre
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
