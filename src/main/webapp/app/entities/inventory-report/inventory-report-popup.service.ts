import {Component, Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {HttpResponse} from "@angular/common/http";
import {InventoryReport} from "./inventory-report.model";
import {InventoryReportService} from "./inventory-report.service";

@Injectable()
export class InventoryReportPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private inventoryReportService: InventoryReportService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.inventoryReportService.find(id)
                    .subscribe((inventoryReportResponse: HttpResponse<InventoryReport>) => {
                        const inventoryReport: InventoryReport = inventoryReportResponse.body;
                        this.ngbModalRef = this.inventoryReportModalRef(component, inventoryReport);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.inventoryReportModalRef(component, new InventoryReport());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    inventoryReportModalRef(component: Component, inventoryReport: InventoryReport): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.inventoryReport = inventoryReport;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
