import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {InventorySharedModule} from "../../shared";
import {
    SteelPipeComponent,
    SteelPipeDeleteDialogComponent,
    SteelPipeDeletePopupComponent,
    SteelPipeDetailComponent,
    SteelPipeDialogComponent,
    SteelPipePopupComponent,
    steelPipePopupRoute,
    SteelPipePopupService,
    SteelPipeResolvePagingParams,
    steelPipeRoute,
    SteelPipeService
} from "./";

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
