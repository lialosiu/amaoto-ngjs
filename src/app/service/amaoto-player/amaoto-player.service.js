export class AmaotoPlayerService {
    constructor($log, toastr, $http, $mdDialog, $timeout, ngAudio) {
        'ngInject';
        this.$log = $log;
        this.$http = $http;
        this.toastr = toastr;
        this.$timeout = $timeout;
        this.$mdDialog = $mdDialog;
        this.ngAudio = ngAudio;

        this.player = undefined;
        this.playing = {};
        this.playing.title = undefined;
        this.playing.artist = undefined;
    }

    loadMusic(music) {
        this.playing.title = music.title;
        this.playing.artist = music.artist;
        this.playing.cover_thumbnail = music.show_thumbnail_cover_url;
        this.playing.url = music.show_url;
        if (typeof this.player != 'undefined'){
            this.player.stop();
            this.$log.debug('stop');
        }
        this.player = this.ngAudio.load(this.playing.url);
    }

    loadMusicAndPlay(music) {
        this.loadMusic(music);
        this.player.play();
    }
}
