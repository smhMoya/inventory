import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {InventorySharedModule} from "../../shared";
import {
    WarehouseComponent,
    WarehouseDeleteDialogComponent,
    WarehouseDeletePopupComponent,
    WarehouseDetailComponent,
    WarehouseDialogComponent,
    WarehousePopupComponent,
    warehousePopupRoute,
    WarehousePopupService,
    WarehouseResolvePagingParams,
    warehouseRoute,
    WarehouseService
} from "./";

const ENTITY_STATES = [
    ...warehouseRoute,
    ...warehousePopupRoute,
];

@NgModule({
    imports: [
        InventorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WarehouseComponent,
        WarehouseDetailComponent,
        WarehouseDialogComponent,
        WarehouseDeleteDialogComponent,
        WarehousePopupComponent,
        WarehouseDeletePopupComponent,
    ],
    entryComponents: [
        WarehouseComponent,
        WarehouseDialogComponent,
        WarehousePopupComponent,
        WarehouseDeleteDialogComponent,
        WarehouseDeletePopupComponent,
    ],
    providers: [
        WarehouseService,
        WarehousePopupService,
        WarehouseResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InventoryWarehouseModule {}
