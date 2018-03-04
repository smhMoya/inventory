import { BaseEntity } from './../../shared';

export class InventoryReport implements BaseEntity {
    constructor(
        public id?: number,
        public steelPipeType?: string,
        public thickness?: string,
        public num?: number,
        public inventories?: BaseEntity[],
    ) {
    }
}
