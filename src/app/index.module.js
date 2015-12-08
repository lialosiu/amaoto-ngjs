/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

// Controller
import { AmaotoController } from './controller/amaoto.controller';
import { AuthController } from './controller/auth/auth.controller';
import { SignInController as Auth_SignInController } from './controller/auth/sign-in/sign-in.controller';
import { HomepageController } from './controller/homepage/homepage.controller';
import { ConsoleController } from './controller/console/console.controller';
import { FileUploaderDialogController as Dialog_FileUploaderDialogController } from './dialog/uploader/file/file.controller';
import { ImageUploaderDialogController as Dialog_ImageUploaderDialogController } from './dialog/uploader/image/image.controller';
import { MusicUploaderDialogController as Dialog_MusicUploaderDialogController } from './dialog/uploader/music/music.controller';
import { UserListController as Console_UserListController } from './controller/console/user/list.controller';
import { FileListController as Console_FileListController } from './controller/console/file/list/list.controller';
import { ImageListController as Console_ImageListController } from './controller/console/image/list/list.controller';
import { MusicListController as Console_MusicListController } from './controller/console/music/list/list.controller';

// Service
import { AmaotoCoreService } from './service/amaoto-core/amaoto-core.service';
import { AmaotoPlayerService } from './service/amaoto-player/amaoto-player.service';

// Directive
import { UserMenuDirective } from '../app/directive/user-menu/user-menu.directive';
import { FileUploaderDirective } from '../app/directive/uploader/file/file.directive';
import { ImageUploaderDirective } from '../app/directive/uploader/image/image.directive';
import { MusicUploaderDirective } from '../app/directive/uploader/music/music.directive';
import { SimplePlayerDirective } from '../app/directive/player/simple/simple.directive';
import { V2AmaotoPlayerDirective } from '../app/directive/player/amaoto/v2/v2.directive';

angular.module('amaotoNgjs', [
        'ngAnimate',
        'ngCookies',
        'ngTouch',
        'ngSanitize',
        'ngMessages',
        'ngAria',
        'ngResource',
        'ui.router',
        'ngMaterial',
        'toastr',
        'ngFileUpload',
        'ngAudio'
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
    .controller('HomepageController', HomepageController)
    .controller('ConsoleController', ConsoleController)
    .controller('Dialog_FileUploaderDialogController', Dialog_FileUploaderDialogController)
    .controller('Dialog_ImageUploaderDialogController', Dialog_ImageUploaderDialogController)
    .controller('Dialog_MusicUploaderDialogController', Dialog_MusicUploaderDialogController)
    .controller('Console_UserListController', Console_UserListController)
    .controller('Console_FileListController', Console_FileListController)
    .controller('Console_ImageListController', Console_ImageListController)
    .controller('Console_MusicListController', Console_MusicListController)
    .directive('amaotoUserMenu', UserMenuDirective)
    .directive('amaotoFileUploader', FileUploaderDirective)
    .directive('amaotoImageUploader', ImageUploaderDirective)
    .directive('amaotoMusicUploader', MusicUploaderDirective)
    .directive('amaotoSimplePlayer', SimplePlayerDirective)
    .directive('amaotoV2Player', V2AmaotoPlayerDirective)
;
