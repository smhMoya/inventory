/* tslint:disable max-line-length */
import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from "@angular/core/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs/Observable";
import {JhiEventManager} from "ng-jhipster";

import {InventoryTestModule} from "../../../test.module";
import {InventoryReportDeleteDialogComponent} from "../../../../../../main/webapp/app/entities/inventory-report/inventory-report-delete-dialog.component";
import {InventoryReportService} from "../../../../../../main/webapp/app/entities/inventory-report/inventory-report.service";

describe('Component Tests', () => {

    describe('InventoryReport Management Delete Component', () => {
        let comp: InventoryReportDeleteDialogComponent;
        let fixture: ComponentFixture<InventoryReportDeleteDialogComponent>;
        let service: InventoryReportService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InventoryTestModule],
                declarations: [InventoryReportDeleteDialogComponent],
                providers: [
                    InventoryReportService
                ]
            })
            .overrideTemplate(InventoryReportDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InventoryReportDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InventoryReportService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
