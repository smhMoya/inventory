import { BaseEntity } from './../../shared';

export class Inventory implements BaseEntity {
    constructor(
        public id?: number,
        public entryDate?: any,
        public exitDate?: any,
        public customerName?: string,
        public wnet?: number,
        public num?: number,
        public warehouse?: BaseEntity,
        public steelPipe?: BaseEntity,
        public customer?: BaseEntity,
        public inventoryReport?: BaseEntity,
    ) {
    }
}
