import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InventorySharedModule } from '../../shared';
import {
    InventoryReportService,
    InventoryReportPopupService,
    InventoryReportComponent,
    InventoryReportDetailComponent,
    InventoryReportDialogComponent,
    InventoryReportPopupComponent,
    InventoryReportDeletePopupComponent,
    InventoryReportDeleteDialogComponent,
    inventoryReportRoute,
    inventoryReportPopupRoute,
} from './';

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
