export class FileUploaderDialogController {
    constructor($mdDialog) {
        'ngInject';

        this.$mdDialog = $mdDialog;
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}
