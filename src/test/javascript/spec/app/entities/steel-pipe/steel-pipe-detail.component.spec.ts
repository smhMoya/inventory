/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { InventoryTestModule } from '../../../test.module';
import { SteelPipeDetailComponent } from '../../../../../../main/webapp/app/entities/steel-pipe/steel-pipe-detail.component';
import { SteelPipeService } from '../../../../../../main/webapp/app/entities/steel-pipe/steel-pipe.service';
import { SteelPipe } from '../../../../../../main/webapp/app/entities/steel-pipe/steel-pipe.model';

describe('Component Tests', () => {

    describe('SteelPipe Management Detail Component', () => {
        let comp: SteelPipeDetailComponent;
        let fixture: ComponentFixture<SteelPipeDetailComponent>;
        let service: SteelPipeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InventoryTestModule],
                declarations: [SteelPipeDetailComponent],
                providers: [
                    SteelPipeService
                ]
            })
            .overrideTemplate(SteelPipeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SteelPipeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SteelPipeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SteelPipe(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.steelPipe).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
