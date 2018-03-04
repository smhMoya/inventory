/* tslint:disable max-line-length */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {Observable} from "rxjs/Observable";
import {HttpHeaders, HttpResponse} from "@angular/common/http";

import {InventoryTestModule} from "../../../test.module";
import {InventoryReportComponent} from "../../../../../../main/webapp/app/entities/inventory-report/inventory-report.component";
import {InventoryReportService} from "../../../../../../main/webapp/app/entities/inventory-report/inventory-report.service";
import {InventoryReport} from "../../../../../../main/webapp/app/entities/inventory-report/inventory-report.model";

describe('Component Tests', () => {

    describe('InventoryReport Management Component', () => {
        let comp: InventoryReportComponent;
        let fixture: ComponentFixture<InventoryReportComponent>;
        let service: InventoryReportService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InventoryTestModule],
                declarations: [InventoryReportComponent],
                providers: [
                    InventoryReportService
                ]
            })
            .overrideTemplate(InventoryReportComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InventoryReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InventoryReportService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new InventoryReport(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.inventoryReports[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
