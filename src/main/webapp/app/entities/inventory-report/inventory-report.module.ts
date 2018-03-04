import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {InventorySharedModule} from "../../shared";
import {
    InventoryReportComponent,
    InventoryReportDeleteDialogComponent,
    InventoryReportDeletePopupComponent,
    InventoryReportDetailComponent,
    InventoryReportDialogComponent,
    InventoryReportPopupComponent,
    inventoryReportPopupRoute,
    InventoryReportPopupService,
    inventoryReportRoute,
    InventoryReportService
} from "./";

const ENTITY_STATES = [
    ...inventoryReportRoute,
    ...inventoryReportPopupRoute,
];

@NgModule({
    imports: [
        InventorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InventoryReportComponent,
        InventoryReportDetailComponent,
        InventoryReportDialogComponent,
        InventoryReportDeleteDialogComponent,
        InventoryReportPopupComponent,
        InventoryReportDeletePopupComponent,
    ],
    entryComponents: [
        InventoryReportComponent,
        InventoryReportDialogComponent,
        InventoryReportPopupComponent,
        InventoryReportDeleteDialogComponent,
        InventoryReportDeletePopupComponent,
    ],
    providers: [
        InventoryReportService,
        InventoryReportPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InventoryInventoryReportModule {}
