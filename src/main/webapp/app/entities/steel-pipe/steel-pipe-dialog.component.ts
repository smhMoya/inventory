import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

import {Observable} from "rxjs/Observable";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {JhiEventManager} from "ng-jhipster";

import {SteelPipe} from "./steel-pipe.model";
import {SteelPipePopupService} from "./steel-pipe-popup.service";
import {SteelPipeService} from "./steel-pipe.service";

@Component({
    selector: 'jhi-steel-pipe-dialog',
    templateUrl: './steel-pipe-dialog.component.html'
})
export class SteelPipeDialogComponent implements OnInit {

    steelPipe: SteelPipe;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private steelPipeService: SteelPipeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.steelPipe.id !== undefined) {
            this.subscribeToSaveResponse(
                this.steelPipeService.update(this.steelPipe));
        } else {
            this.subscribeToSaveResponse(
                this.steelPipeService.create(this.steelPipe));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SteelPipe>>) {
        result.subscribe((res: HttpResponse<SteelPipe>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SteelPipe) {
        this.eventManager.broadcast({ name: 'steelPipeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-steel-pipe-popup',
    template: ''
})
export class SteelPipePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private steelPipePopupService: SteelPipePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.steelPipePopupService
                    .open(SteelPipeDialogComponent as Component, params['id']);
            } else {
                this.steelPipePopupService
                    .open(SteelPipeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
