export class ImageUploaderDialogController {
    constructor($mdDialog) {
        'ngInject';

        this.$mdDialog = $mdDialog;
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}
