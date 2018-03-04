import {BaseEntity} from "./../../shared";

export class Customer implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public description?: string,
    ) {
    }
}
