/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

// Controller
import { AmaotoController } from './controller/amaoto.controller';
import { AuthController } from './controller/auth/auth.controller';
import { SignInController as Auth_SignInController } from './controller/auth/sign-in/sign-in.controller';

import { HomeController } from './controller/home/home.controller';
import { HomapageController } from './controller/home/homepage/homepage.controller';

import { ConsoleController } from './controller/console/console.controller';
import { UserListController as Console_UserListController } from './controller/console/user/list.controller';
import { FileListController as Console_FileListController } from './controller/console/file/list/list.controller';
import { ImageListController as Console_ImageListController } from './controller/console/image/list/list.controller';
import { MusicListController as Console_MusicListController } from './controller/console/music/list/list.controller';
import { AlbumListController as Console_AlbumListController } from './controller/console/album/list/list.controller';

import { FileUploaderDialogController as Dialog_FileUploaderDialogController } from './dialog/uploader/file/file.controller';
import { ImageUploaderDialogController as Dialog_ImageUploaderDialogController } from './dialog/uploader/image/image.controller';
import { MusicUploaderDialogController as Dialog_MusicUploaderDialogController } from './dialog/uploader/music/music.controller';
import { AlbumUploaderDialogController as Dialog_AlbumUploaderDialogController } from './dialog/uploader/album/album.controller';
import { MusicEditorDialogController } from './dialog/editor/music/music.controller';
import { AlbumEditorDialogController } from './dialog/editor/album/album.controller';


// Service
import { AmaotoCoreService } from './service/amaoto-core/amaoto-core.service';
import { AmaotoPlayerService } from './service/amaoto-player/amaoto-player.service';

// Directive
import { UserMenuDirective } from '../app/directive/user-menu/user-menu.directive';
import { V2AmaotoPlayerDirective } from '../app/directive/player/amaoto/v2/v2.directive';

angular.module('amaotoNgjs', [
        'ngAnimate',
        'ngCookies',
        'ngSanitize',
        'ngMessages',
        'ngAria',
        'ngResource',
        'ui.router',
        'ngMaterial',
        'toastr',
        'ngFileUpload',
        'ngAudio',
        'md.data.table',
        'angularMoment'
    ])
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .service('$amaotoCore', AmaotoCoreService)
    .service('$amaotoPlayer', AmaotoPlayerService)
    .controller('AmaotoController', AmaotoController)
    .controller('AuthController', AuthController)
    .controller('Auth_SignInController', Auth_SignInController)
    .controller('HomeController', HomeController)
    .controller('HomepageController', HomapageController)
    .controller('ConsoleController', ConsoleController)
    .controller('Console_UserListController', Console_UserListController)
    .controller('Console_FileListController', Console_FileListController)
    .controller('Console_ImageListController', Console_ImageListController)
    .controller('Console_MusicListController', Console_MusicListController)
    .controller('Console_AlbumListController', Console_AlbumListController)
    .controller('Dialog_FileUploaderDialogController', Dialog_FileUploaderDialogController)
    .controller('Dialog_ImageUploaderDialogController', Dialog_ImageUploaderDialogController)
    .controller('Dialog_MusicUploaderDialogController', Dialog_MusicUploaderDialogController)
    .controller('Dialog_AlbumUploaderDialogController', Dialog_AlbumUploaderDialogController)
    .controller('MusicEditorDialogController', MusicEditorDialogController)
    .controller('AlbumEditorDialogController', AlbumEditorDialogController)
    .directive('amaotoUserMenu', UserMenuDirective)
    .directive('amaotoV2Player', V2AmaotoPlayerDirective)
;
