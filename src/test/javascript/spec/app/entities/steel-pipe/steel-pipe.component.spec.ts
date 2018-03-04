/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InventoryTestModule } from '../../../test.module';
import { SteelPipeComponent } from '../../../../../../main/webapp/app/entities/steel-pipe/steel-pipe.component';
import { SteelPipeService } from '../../../../../../main/webapp/app/entities/steel-pipe/steel-pipe.service';
import { SteelPipe } from '../../../../../../main/webapp/app/entities/steel-pipe/steel-pipe.model';

describe('Component Tests', () => {

    describe('SteelPipe Management Component', () => {
        let comp: SteelPipeComponent;
        let fixture: ComponentFixture<SteelPipeComponent>;
        let service: SteelPipeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InventoryTestModule],
                declarations: [SteelPipeComponent],
                providers: [
                    SteelPipeService
                ]
            })
            .overrideTemplate(SteelPipeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SteelPipeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SteelPipeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SteelPipe(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.steelPipes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
