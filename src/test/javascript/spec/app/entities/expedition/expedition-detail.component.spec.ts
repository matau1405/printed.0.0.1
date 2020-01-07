import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestPrintedV5TestModule } from '../../../test.module';
import { ExpeditionDetailComponent } from 'app/entities/expedition/expedition-detail.component';
import { Expedition } from 'app/shared/model/expedition.model';

describe('Component Tests', () => {
  describe('Expedition Management Detail Component', () => {
    let comp: ExpeditionDetailComponent;
    let fixture: ComponentFixture<ExpeditionDetailComponent>;
    const route = ({ data: of({ expedition: new Expedition('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestPrintedV5TestModule],
        declarations: [ExpeditionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ExpeditionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExpeditionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.expedition).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
