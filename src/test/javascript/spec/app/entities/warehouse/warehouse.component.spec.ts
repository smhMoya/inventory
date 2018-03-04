/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InventoryTestModule } from '../../../test.module';
import { WarehouseComponent } from '../../../../../../main/webapp/app/entities/warehouse/warehouse.component';
import { WarehouseService } from '../../../../../../main/webapp/app/entities/warehouse/warehouse.service';
import { Warehouse } from '../../../../../../main/webapp/app/entities/warehouse/warehouse.model';

describe('Component Tests', () => {

    describe('Warehouse Management Component', () => {
        let comp: WarehouseComponent;
        let fixture: ComponentFixture<WarehouseComponent>;
        let service: WarehouseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InventoryTestModule],
                declarations: [WarehouseComponent],
                providers: [
                    WarehouseService
                ]
            })
            .overrideTemplate(WarehouseComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WarehouseComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Warehouse(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.warehouses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
