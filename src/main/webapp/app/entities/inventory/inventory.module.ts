import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {InventorySharedModule} from "../../shared";
import {
    InventoryComponent,
    InventoryDeleteDialogComponent,
    InventoryDeletePopupComponent,
    InventoryDetailComponent,
    InventoryDialogComponent,
    InventoryPopupComponent,
    inventoryPopupRoute,
    InventoryPopupService,
    InventoryResolvePagingParams,
    inventoryRoute,
    InventoryService
} from "./";

const ENTITY_STATES = [
    ...inventoryRoute,
    ...inventoryPopupRoute,
];

@NgModule({
    imports: [
        InventorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InventoryComponent,
        InventoryDetailComponent,
        InventoryDialogComponent,
        InventoryDeleteDialogComponent,
        InventoryPopupComponent,
        InventoryDeletePopupComponent,
    ],
    entryComponents: [
        InventoryComponent,
        InventoryDialogComponent,
        InventoryPopupComponent,
        InventoryDeleteDialogComponent,
        InventoryDeletePopupComponent,
    ],
    providers: [
        InventoryService,
        InventoryPopupService,
        InventoryResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InventoryInventoryModule {}
