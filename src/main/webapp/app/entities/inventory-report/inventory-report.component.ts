import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InventoryReport } from './inventory-report.model';
import { InventoryReportService } from './inventory-report.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-inventory-report',
    templateUrl: './inventory-report.component.html'
})
export class InventoryReportComponent implements OnInit, OnDestroy {
inventoryReports: InventoryReport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private inventoryReportService: InventoryReportService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.inventoryReportService.query().subscribe(
            (res: HttpResponse<InventoryReport[]>) => {
                this.inventoryReports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInventoryReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: InventoryReport) {
        return item.id;
    }
    registerChangeInInventoryReports() {
        this.eventSubscriber = this.eventManager.subscribe('inventoryReportListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
