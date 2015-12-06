export class MusicUploaderDialogController {
    constructor($mdDialog) {
        'ngInject';

        this.$mdDialog = $mdDialog;
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}
