export class AlbumEditorDialogController {
    constructor($mdDialog, $state, $amaotoCore, $amaotoPlayer, $log, $timeout, Upload, $http) {
        'ngInject';

        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.$amaotoCore = $amaotoCore;
        this.$amaotoPlayer = $amaotoPlayer;
        this.$log = $log;
        this.$timeout = $timeout;
        this.$http = $http;

        this.form = {};
        this.form.title = this.album.title;
        this.form.artist = this.album.artist;
        this.form.year = this.album.year;
        this.form.genre = this.album.genre;
        this.form.cover_thumbnail = this.album.show_thumbnail_cover_url;
        this.form.cover_image_id = this.album.cover_image_id;
        this.form.musics = this.album.musics;
    }

    submit() {
        let self = this;
        let musics = [];
        for (let music of this.form.musics) {
            musics.push(music.id);
        }
        self.$amaotoCore.doPost(self.$amaotoCore.url(self.$amaotoCore.API_POST_ALBUM_EDIT, {albumId: self.album.id}), {
            title: self.form.title,
            artist: self.form.artist,
            year: self.form.year,
            genre: self.form.genre,
            cover_image_id: self.form.cover_image_id,
            musics: musics
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

    removeMusic(music) {
        this.form.musics = this.form.musics.filter((el)=> {
            return el.id != music.id;
        });
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}
