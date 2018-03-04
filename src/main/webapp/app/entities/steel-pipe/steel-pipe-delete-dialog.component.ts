import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {JhiEventManager} from "ng-jhipster";

import {SteelPipe} from "./steel-pipe.model";
import {SteelPipePopupService} from "./steel-pipe-popup.service";
import {SteelPipeService} from "./steel-pipe.service";

@Component({
    selector: 'jhi-steel-pipe-delete-dialog',
    templateUrl: './steel-pipe-delete-dialog.component.html'
})
export class SteelPipeDeleteDialogComponent {

    steelPipe: SteelPipe;

    constructor(
        private steelPipeService: SteelPipeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.steelPipeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'steelPipeListModification',
                content: 'Deleted an steelPipe'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-steel-pipe-delete-popup',
    template: ''
})
export class SteelPipeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private steelPipePopupService: SteelPipePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.steelPipePopupService
                .open(SteelPipeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
