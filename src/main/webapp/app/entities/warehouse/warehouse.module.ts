import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InventorySharedModule } from '../../shared';
import {
    WarehouseService,
    WarehousePopupService,
    WarehouseComponent,
    WarehouseDetailComponent,
    WarehouseDialogComponent,
    WarehousePopupComponent,
    WarehouseDeletePopupComponent,
    WarehouseDeleteDialogComponent,
    warehouseRoute,
    warehousePopupRoute,
    WarehouseResolvePagingParams,
} from './';

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
