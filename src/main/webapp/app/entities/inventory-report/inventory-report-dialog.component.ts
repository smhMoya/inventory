import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

import {Observable} from "rxjs/Observable";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {JhiEventManager} from "ng-jhipster";

import {InventoryReport} from "./inventory-report.model";
import {InventoryReportPopupService} from "./inventory-report-popup.service";
import {InventoryReportService} from "./inventory-report.service";

@Component({
    selector: 'jhi-inventory-report-dialog',
    templateUrl: './inventory-report-dialog.component.html'
})
export class InventoryReportDialogComponent implements OnInit {

    inventoryReport: InventoryReport;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private inventoryReportService: InventoryReportService,
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
        if (this.inventoryReport.id !== undefined) {
            this.subscribeToSaveResponse(
                this.inventoryReportService.update(this.inventoryReport));
        } else {
            this.subscribeToSaveResponse(
                this.inventoryReportService.create(this.inventoryReport));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<InventoryReport>>) {
        result.subscribe((res: HttpResponse<InventoryReport>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: InventoryReport) {
        this.eventManager.broadcast({ name: 'inventoryReportListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-inventory-report-popup',
    template: ''
})
export class InventoryReportPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private inventoryReportPopupService: InventoryReportPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.inventoryReportPopupService
                    .open(InventoryReportDialogComponent as Component, params['id']);
            } else {
                this.inventoryReportPopupService
                    .open(InventoryReportDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
