export class SignInController {
    constructor($log, toastr, $amaotoCore, $state) {
        'ngInject';

        this.$log = $log;
        this.toastr = toastr;
        this.$amaotoCore = $amaotoCore;
        this.$state = $state;
    }

    signIn() {
        this.$amaotoCore.doSignIn(this.user.username, this.user.password)
    }
}
