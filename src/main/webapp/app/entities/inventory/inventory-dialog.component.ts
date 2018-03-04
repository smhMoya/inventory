import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

import {Observable} from "rxjs/Observable";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";

import {Inventory} from "./inventory.model";
import {InventoryPopupService} from "./inventory-popup.service";
import {InventoryService} from "./inventory.service";
import {Warehouse, WarehouseService} from "../warehouse";
import {SteelPipe, SteelPipeService} from "../steel-pipe";
import {Customer, CustomerService} from "../customer";
import {InventoryReport, InventoryReportService} from "../inventory-report";

@Component({
    selector: 'jhi-inventory-dialog',
    templateUrl: './inventory-dialog.component.html'
})
export class InventoryDialogComponent implements OnInit {

    inventory: Inventory;
    isSaving: boolean;

    warehouses: Warehouse[];

    steelpipes: SteelPipe[];

    customers: Customer[];

    inventoryreports: InventoryReport[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private inventoryService: InventoryService,
        private warehouseService: WarehouseService,
        private steelPipeService: SteelPipeService,
        private customerService: CustomerService,
        private inventoryReportService: InventoryReportService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.warehouseService
            .query({filter: 'inventory-is-null'})
            .subscribe((res: HttpResponse<Warehouse[]>) => {
                if (!this.inventory.warehouse || !this.inventory.warehouse.id) {
                    this.warehouses = res.body;
                } else {
                    this.warehouseService
                        .find(this.inventory.warehouse.id)
                        .subscribe((subRes: HttpResponse<Warehouse>) => {
                            this.warehouses = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.steelPipeService
            .query({filter: 'inventory-is-null'})
            .subscribe((res: HttpResponse<SteelPipe[]>) => {
                if (!this.inventory.steelPipe || !this.inventory.steelPipe.id) {
                    this.steelpipes = res.body;
                } else {
                    this.steelPipeService
                        .find(this.inventory.steelPipe.id)
                        .subscribe((subRes: HttpResponse<SteelPipe>) => {
                            this.steelpipes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.customerService
            .query({filter: 'inventory-is-null'})
            .subscribe((res: HttpResponse<Customer[]>) => {
                if (!this.inventory.customer || !this.inventory.customer.id) {
                    this.customers = res.body;
                } else {
                    this.customerService
                        .find(this.inventory.customer.id)
                        .subscribe((subRes: HttpResponse<Customer>) => {
                            this.customers = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.inventoryReportService.query()
            .subscribe((res: HttpResponse<InventoryReport[]>) => { this.inventoryreports = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.inventory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.inventoryService.update(this.inventory));
        } else {
            this.subscribeToSaveResponse(
                this.inventoryService.create(this.inventory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Inventory>>) {
        result.subscribe((res: HttpResponse<Inventory>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Inventory) {
        this.eventManager.broadcast({ name: 'inventoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackWarehouseById(index: number, item: Warehouse) {
        return item.id;
    }

    trackSteelPipeById(index: number, item: SteelPipe) {
        return item.id;
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }

    trackInventoryReportById(index: number, item: InventoryReport) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-inventory-popup',
    template: ''
})
export class InventoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private inventoryPopupService: InventoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.inventoryPopupService
                    .open(InventoryDialogComponent as Component, params['id']);
            } else {
                this.inventoryPopupService
                    .open(InventoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
