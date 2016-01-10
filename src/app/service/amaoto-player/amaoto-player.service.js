export class AmaotoPlayerService {
    constructor($log, toastr, $http, $mdDialog, $timeout, $window) {
        'ngInject';
        this.$log = $log;
        this.$http = $http;
        this.toastr = toastr;
        this.$timeout = $timeout;
        this.$mdDialog = $mdDialog;

        this.player = {};
        this.player.audio = $window.Audio ? new $window.Audio() : {};
        this.player.audio.crossOrigin = "anonymous";
        this.player.dancer = new $window.Dancer();
        this.player.dancer.load(this.player.audio);

        this.ready();
        this.playlist = [];

        this.player.audio.addEventListener('timeupdate', ()=> {
            $timeout(()=> {
                this.player.playedProgress = (this.player.audio.currentTime / this.player.audio.duration) * 100;
                this.player.bufferedProgress = this.player.audio.buffered.length > 0 ? this.player.audio.buffered.end(this.player.audio.buffered.length - 1) / this.player.audio.duration * 100 : 0;
            }, 0);
        });

        this.player.audio.addEventListener('ended', ()=> {
            if (!this.next()) {
                this.ready();
            }
        });
    }

    insertMusicToPlaylist(music, playNow) {
        let current = this.playlist.indexOf(this.playing);
        this.playlist.splice(current + 1, 0, music);
        if (playNow)
            this.next();
    }

    addMusicToPlaylist(music) {
        this.playlist.push(music);
    }

    removeMusicFormPlaylistByIndex(index) {
        this.playlist.splice(index, 1);
    }

    insertAlbumToPlaylist(album, playNow) {
        let current = this.playlist.indexOf(this.playing);
        let i = 1;
        for (let music of album.musics) {
            this.playlist.splice(current + i++, 0, music);
        }
        if (playNow)
            this.next();
    }

    addAlbumToPlaylist(album) {
        for (let music of album.musics) {
            this.addMusicToPlaylist(music);
        }
    }

    loadMusic(music) {
        this.$log.debug(music);
        this.playing.status = 'played';

        this.playing = music;
        this.playing.status = 'loaded';

        if (typeof this.player != 'undefined') {
            this.stop();
        }

        this.player.audio.src = this.playing.show_url;
        this.player.audio.load();
    }

    loadMusicAndPlay(music) {
        this.loadMusic(music);
        this.play();
    }

    play() {
        this.player.audio.play();
        this.playing.status = 'playing';
    }

    pause() {
        this.player.audio.pause();
        this.playing.status = 'pause';
    }

    stop() {
        this.player.audio.pause();
        this.player.audio.currentTime = 0;
        this.playing.status = 'loaded';
    }


    prev() {
        let current = this.playlist.indexOf(this.playing);
        if (current == 0)
            return false;

        this.loadMusic(this.playlist[current - 1]);
        this.play();
        return true
    }

    next() {
        let current = this.playlist.indexOf(this.playing);
        let total = this.playlist.length;
        if (current + 1 == total)
            return false;

        this.loadMusic(this.playlist[current + 1]);
        this.play();
        return true
    }

    ready() {
        this.playing = {};
        this.playing.title = 'Nothing Playing';
    }
}
