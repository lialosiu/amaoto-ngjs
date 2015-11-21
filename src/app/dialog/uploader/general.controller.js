export class UploaderDialogController {
    constructor($mdDialog) {
        'ngInject';

        this.$mdDialog = $mdDialog;
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}
