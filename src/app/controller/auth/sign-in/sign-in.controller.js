export class SignInController {
    constructor($log, toastr, $amaotoCore, $state, $mdDialog) {
        'ngInject';

        this.$log = $log;
        this.toastr = toastr;
        this.$amaotoCore = $amaotoCore;
        this.$state = $state;
        this.$mdDialog = $mdDialog;
    }

    submit() {
        let self = this;
        this.$amaotoCore.doSignIn(self.form.username, self.form.password).then((response)=> {
            if (response.status == 200)
                if (this.$amaotoCore.localData.currentUser.isAdministrator)
                    return self.$state.go('console');
                else
                    return self.$state.go('homepage');
        })
    }
}
