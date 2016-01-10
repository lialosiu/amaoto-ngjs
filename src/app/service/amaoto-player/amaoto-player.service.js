export class AmaotoPlayerService {
    constructor($log, toastr, $http, $mdDialog, $timeout, $window, $cookies, $amaotoCore) {
        'ngInject';
        this.$log = $log;
        this.$http = $http;
        this.toastr = toastr;
        this.$timeout = $timeout;
        this.$mdDialog = $mdDialog;
        this.$cookies = $cookies;
        this.$amaotoCore = $amaotoCore;

        this.player = {};
        this.player.audio = $window.Audio ? new $window.Audio() : {};
        this.player.audio.crossOrigin = "anonymous";
        this.player.dancer = new $window.Dancer();
        this.player.dancer.load(this.player.audio);
        this.player.loopType = 'queue';

        this.ready();
        this.playlist = [];
        this.initByCookies();

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

        this.player.audio.addEventListener('error', ()=> {
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
        this.updateCookies();
    }

    addMusicToPlaylist(music) {
        this.playlist.push(music);
        this.updateCookies();
    }

    removeMusicFormPlaylistByIndex(index) {
        this.playlist.splice(index, 1);
        this.updateCookies();
    }

    insertAlbumToPlaylist(album, playNow) {
        let current = this.playlist.indexOf(this.playing);
        let i = 1;
        for (let music of album.musics) {
            this.playlist.splice(current + i++, 0, music);
        }
        if (playNow)
            this.next();
        this.updateCookies();
    }

    addAlbumToPlaylist(album) {
        for (let music of album.musics) {
            this.addMusicToPlaylist(music);
        }
        this.updateCookies();
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
        this.updateCookies();
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

        let index = undefined;
        switch (this.player.loopType) {
            case 'queue':
                if (current == 0)
                    index = -1;
                else
                    index = current - 1;
                break;
            case'loop':
                index = current;
                break;
            case 'shuffle':
                index = parseInt(Math.random() * (this.playlist.length), 10);
                break;
        }


        if (index == -1)
            return false;

        this.loadMusic(this.playlist[index]);
        this.play();
        return true
    }

    next() {
        let current = this.playlist.indexOf(this.playing);

        let index = undefined;
        switch (this.player.loopType) {
            case 'queue':
                if (current + 1 == this.playlist.length)
                    index = -1;
                else
                    index = current + 1;
                break;
            case'loop':
                index = current;
                break;
            case 'shuffle':
                index = parseInt(Math.random() * (this.playlist.length), 10);
                break;
        }


        if (index == -1)
            return false;

        this.loadMusic(this.playlist[index]);
        this.play();
        return true
    }

    ready() {
        this.playing = {};
        this.playing.title = 'Nothing Playing';
    }

    emptyPlaylist() {
        this.playlist = [];
    }

    changeLoopType() {
        switch (this.player.loopType) {
            case 'queue':
                this.player.loopType = 'loop';
                break;
            case'loop':
                this.player.loopType = 'shuffle';
                break;
            case 'shuffle':
                this.player.loopType = 'queue';
                break;
        }
    }

    updateCookies() {
        let ids = [];
        for (let music of this.playlist) {
            ids.push(music.id)
        }
        this.$cookies.putObject('playlist-music-ids', ids, {
            expires: new Date(new Date().getTime() + 365 * 86400000)
        });
        this.$cookies.put('playing-music-id', this.playing.id, {
            expires: new Date(new Date().getTime() + 365 * 86400000)
        });
    }

    initByCookies() {
        let ids = this.$cookies.getObject('playlist-music-ids');
        let playingMusicId = this.$cookies.get('playing-music-id');

        if (!ids)
            return;

        this.$amaotoCore.getMusicsByIds(ids).then((rsp)=> {
            this.playlist = rsp.data;
            for (let music of this.playlist) {
                if (music.id == playingMusicId) {
                    this.loadMusic(music);
                    break;
                }
            }
        });
    }
}
