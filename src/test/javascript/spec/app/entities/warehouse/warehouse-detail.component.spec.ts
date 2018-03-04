/* tslint:disable max-line-length */
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {InventoryTestModule} from "../../../test.module";
import {WarehouseDetailComponent} from "../../../../../../main/webapp/app/entities/warehouse/warehouse-detail.component";
import {WarehouseService} from "../../../../../../main/webapp/app/entities/warehouse/warehouse.service";
import {Warehouse} from "../../../../../../main/webapp/app/entities/warehouse/warehouse.model";

describe('Component Tests', () => {

    describe('Warehouse Management Detail Component', () => {
        let comp: WarehouseDetailComponent;
        let fixture: ComponentFixture<WarehouseDetailComponent>;
        let service: WarehouseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InventoryTestModule],
                declarations: [WarehouseDetailComponent],
                providers: [
                    WarehouseService
                ]
            })
            .overrideTemplate(WarehouseDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WarehouseDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Warehouse(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.warehouse).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
