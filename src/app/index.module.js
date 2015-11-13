/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { HomepageController } from './controller/homepage/homepage.controller';
import { AmaotoCoreService } from '../app/service/amaotoCore/amaotoCore.service';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
//import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';
import { UserMenuDirective } from '../app/directive/userMenu/userMenu.directive';

angular.module('amaotoNgjs', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ngMaterial', 'toastr'])
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .service('$amaotoCore', AmaotoCoreService)
    .service('githubContributor', GithubContributorService)
    .service('webDevTec', WebDevTecService)
    .controller('MainController', MainController)
    .controller('HomepageController', HomepageController)
    .directive('amaotoUserMenu', UserMenuDirective)
    .directive('acmeMalarkey', MalarkeyDirective);
