export class UploaderDialogController {
    constructor($mdDialog) {
        this.$mdDialog = $mdDialog;
        'ngInject';
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}
