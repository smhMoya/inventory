import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InventoryReport } from './inventory-report.model';
import { InventoryReportService } from './inventory-report.service';

@Component({
    selector: 'jhi-inventory-report-detail',
    templateUrl: './inventory-report-detail.component.html'
})
export class InventoryReportDetailComponent implements OnInit, OnDestroy {

    inventoryReport: InventoryReport;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private inventoryReportService: InventoryReportService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInventoryReports();
    }

    load(id) {
        this.inventoryReportService.find(id)
            .subscribe((inventoryReportResponse: HttpResponse<InventoryReport>) => {
                this.inventoryReport = inventoryReportResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInventoryReports() {
        this.eventSubscriber = this.eventManager.subscribe(
            'inventoryReportListModification',
            (response) => this.load(this.inventoryReport.id)
        );
    }
}
