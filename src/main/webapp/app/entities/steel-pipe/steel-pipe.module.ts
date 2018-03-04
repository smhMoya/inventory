import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InventorySharedModule } from '../../shared';
import {
    SteelPipeService,
    SteelPipePopupService,
    SteelPipeComponent,
    SteelPipeDetailComponent,
    SteelPipeDialogComponent,
    SteelPipePopupComponent,
    SteelPipeDeletePopupComponent,
    SteelPipeDeleteDialogComponent,
    steelPipeRoute,
    steelPipePopupRoute,
    SteelPipeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...steelPipeRoute,
    ...steelPipePopupRoute,
];

@NgModule({
    imports: [
        InventorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SteelPipeComponent,
        SteelPipeDetailComponent,
        SteelPipeDialogComponent,
        SteelPipeDeleteDialogComponent,
        SteelPipePopupComponent,
        SteelPipeDeletePopupComponent,
    ],
    entryComponents: [
        SteelPipeComponent,
        SteelPipeDialogComponent,
        SteelPipePopupComponent,
        SteelPipeDeleteDialogComponent,
        SteelPipeDeletePopupComponent,
    ],
    providers: [
        SteelPipeService,
        SteelPipePopupService,
        SteelPipeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InventorySteelPipeModule {}
