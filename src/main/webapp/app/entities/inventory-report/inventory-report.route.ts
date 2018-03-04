import {Routes} from "@angular/router";

import {UserRouteAccessService} from "../../shared";
import {InventoryReportComponent} from "./inventory-report.component";
import {InventoryReportDetailComponent} from "./inventory-report-detail.component";
import {InventoryReportPopupComponent} from "./inventory-report-dialog.component";
import {InventoryReportDeletePopupComponent} from "./inventory-report-delete-dialog.component";

export const inventoryReportRoute: Routes = [
    {
        path: 'inventory-report',
        component: InventoryReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.inventoryReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'inventory-report/:id',
        component: InventoryReportDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.inventoryReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const inventoryReportPopupRoute: Routes = [
    {
        path: 'inventory-report-new',
        component: InventoryReportPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.inventoryReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'inventory-report/:id/edit',
        component: InventoryReportPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.inventoryReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'inventory-report/:id/delete',
        component: InventoryReportDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.inventoryReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
