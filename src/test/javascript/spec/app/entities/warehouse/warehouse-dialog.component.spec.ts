/* tslint:disable max-line-length */
import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from "@angular/core/testing";
import {HttpResponse} from "@angular/common/http";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs/Observable";
import {JhiEventManager} from "ng-jhipster";

import {InventoryTestModule} from "../../../test.module";
import {WarehouseDialogComponent} from "../../../../../../main/webapp/app/entities/warehouse/warehouse-dialog.component";
import {WarehouseService} from "../../../../../../main/webapp/app/entities/warehouse/warehouse.service";
import {Warehouse} from "../../../../../../main/webapp/app/entities/warehouse/warehouse.model";

describe('Component Tests', () => {

    describe('Warehouse Management Dialog Component', () => {
        let comp: WarehouseDialogComponent;
        let fixture: ComponentFixture<WarehouseDialogComponent>;
        let service: WarehouseService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InventoryTestModule],
                declarations: [WarehouseDialogComponent],
                providers: [
                    WarehouseService
                ]
            })
            .overrideTemplate(WarehouseDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WarehouseDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Warehouse(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.warehouse = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'warehouseListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Warehouse();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.warehouse = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'warehouseListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
