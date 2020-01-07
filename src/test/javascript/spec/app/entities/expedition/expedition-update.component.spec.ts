import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TestPrintedV5TestModule } from '../../../test.module';
import { ExpeditionUpdateComponent } from 'app/entities/expedition/expedition-update.component';
import { ExpeditionService } from 'app/entities/expedition/expedition.service';
import { Expedition } from 'app/shared/model/expedition.model';

describe('Component Tests', () => {
  describe('Expedition Management Update Component', () => {
    let comp: ExpeditionUpdateComponent;
    let fixture: ComponentFixture<ExpeditionUpdateComponent>;
    let service: ExpeditionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestPrintedV5TestModule],
        declarations: [ExpeditionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ExpeditionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExpeditionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExpeditionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Expedition('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Expedition();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
