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
        this.playing.title = 'Nothing Playing';
        this.playing.artist = undefined;
        this.playing.cover_thumbnail = 'assets/images/no-cover-300.jpg'
    }

    loadMusic(music) {

        this.$log.debug(music);
        this.playing.title = music.title;
        this.playing.artist = music.artist;
        this.playing.cover_thumbnail = music.show_thumbnail_cover_url ? music.show_thumbnail_cover_url : 'assets/images/no-cover.jpg';
        this.playing.url = music.show_url;
        if (typeof this.player != 'undefined') {
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
