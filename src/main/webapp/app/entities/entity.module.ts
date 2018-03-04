import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { InventoryWarehouseModule } from './warehouse/warehouse.module';
import { InventoryCustomerModule } from './customer/customer.module';
import { InventorySteelPipeModule } from './steel-pipe/steel-pipe.module';
import { InventoryInventoryModule } from './inventory/inventory.module';
import { InventoryInventoryReportModule } from './inventory-report/inventory-report.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        InventoryWarehouseModule,
        InventoryCustomerModule,
        InventorySteelPipeModule,
        InventoryInventoryModule,
        InventoryInventoryReportModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InventoryEntityModule {}
