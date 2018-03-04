import {Component, OnDestroy, OnInit} from "@angular/core";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Subscription} from "rxjs/Subscription";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";

import {Customer} from "./customer.model";
import {CustomerService} from "./customer.service";
import {Principal} from "../../shared";

@Component({
    selector: 'jhi-customer',
    templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit, OnDestroy {
customers: Customer[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private customerService: CustomerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.customerService.query().subscribe(
            (res: HttpResponse<Customer[]>) => {
                this.customers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCustomers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Customer) {
        return item.id;
    }
    registerChangeInCustomers() {
        this.eventSubscriber = this.eventManager.subscribe('customerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
