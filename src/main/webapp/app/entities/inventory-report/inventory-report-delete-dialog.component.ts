import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {JhiEventManager} from "ng-jhipster";

import {InventoryReport} from "./inventory-report.model";
import {InventoryReportPopupService} from "./inventory-report-popup.service";
import {InventoryReportService} from "./inventory-report.service";

@Component({
    selector: 'jhi-inventory-report-delete-dialog',
    templateUrl: './inventory-report-delete-dialog.component.html'
})
export class InventoryReportDeleteDialogComponent {

    inventoryReport: InventoryReport;

    constructor(
        private inventoryReportService: InventoryReportService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.inventoryReportService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'inventoryReportListModification',
                content: 'Deleted an inventoryReport'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-inventory-report-delete-popup',
    template: ''
})
export class InventoryReportDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private inventoryReportPopupService: InventoryReportPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.inventoryReportPopupService
                .open(InventoryReportDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
