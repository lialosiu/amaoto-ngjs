/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

// Controller
import { AuthController } from './controller/auth/auth.controller';
import { SignInController as Auth_SignInController } from './controller/auth/sign-in/sign-in.controller';
import { HomepageController } from './controller/homepage/homepage.controller';
import { ConsoleController } from './controller/console/console.controller';
import { FileUploaderDialogController as Dialog_FileUploaderDialogController } from './dialog/uploader/file/file.controller';
import { ImageUploaderDialogController as Dialog_ImageUploaderDialogController } from './dialog/uploader/image/image.controller';
import { UserListController as Console_UserListController } from './controller/console/user/list.controller';
import { FileListController as Console_FileListController } from './controller/console/file/list.controller';
import { ImageListController as Console_ImageListController } from './controller/console/image/list/list.controller';

// Service
import { AmaotoCoreService } from '../app/service/amaotoCore/amaotoCore.service';
//import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
//import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';

// Directive
//import { NavbarDirective } from '../app/components/navbar/navbar.directive';
//import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';
import { UserMenuDirective } from '../app/directive/user-menu/user-menu.directive';
import { FileUploaderDirective } from '../app/directive/uploader/file/file.directive';
import { ImageUploaderDirective } from '../app/directive/uploader/image/image.directive';

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
        'ngFileUpload'
    ])
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .service('$amaotoCore', AmaotoCoreService)
    //.service('githubContributor', GithubContributorService)
    //.service('webDevTec', WebDevTecService)
    .controller('AuthController', AuthController)
    .controller('Auth_SignInController', Auth_SignInController)
    .controller('HomepageController', HomepageController)
    .controller('ConsoleController', ConsoleController)
    .controller('Dialog_FileUploaderDialogController', Dialog_FileUploaderDialogController)
    .controller('Dialog_ImageUploaderDialogController', Dialog_ImageUploaderDialogController)
    .controller('Console_UserListController', Console_UserListController)
    .controller('Console_FileListController', Console_FileListController)
    .controller('Console_ImageListController', Console_ImageListController)
    .directive('amaotoUserMenu', UserMenuDirective)
    .directive('amaotoFileUploader', FileUploaderDirective)
    .directive('amaotoImageUploader', ImageUploaderDirective)
;
