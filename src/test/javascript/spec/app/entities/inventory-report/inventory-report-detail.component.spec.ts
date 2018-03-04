/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { InventoryTestModule } from '../../../test.module';
import { InventoryReportDetailComponent } from '../../../../../../main/webapp/app/entities/inventory-report/inventory-report-detail.component';
import { InventoryReportService } from '../../../../../../main/webapp/app/entities/inventory-report/inventory-report.service';
import { InventoryReport } from '../../../../../../main/webapp/app/entities/inventory-report/inventory-report.model';

describe('Component Tests', () => {

    describe('InventoryReport Management Detail Component', () => {
        let comp: InventoryReportDetailComponent;
        let fixture: ComponentFixture<InventoryReportDetailComponent>;
        let service: InventoryReportService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InventoryTestModule],
                declarations: [InventoryReportDetailComponent],
                providers: [
                    InventoryReportService
                ]
            })
            .overrideTemplate(InventoryReportDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InventoryReportDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InventoryReportService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new InventoryReport(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.inventoryReport).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
