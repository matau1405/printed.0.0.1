import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TestPrintedV5TestModule } from '../../../test.module';
import { LigneDeCommandeUpdateComponent } from 'app/entities/ligne-de-commande/ligne-de-commande-update.component';
import { LigneDeCommandeService } from 'app/entities/ligne-de-commande/ligne-de-commande.service';
import { LigneDeCommande } from 'app/shared/model/ligne-de-commande.model';

describe('Component Tests', () => {
  describe('LigneDeCommande Management Update Component', () => {
    let comp: LigneDeCommandeUpdateComponent;
    let fixture: ComponentFixture<LigneDeCommandeUpdateComponent>;
    let service: LigneDeCommandeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestPrintedV5TestModule],
        declarations: [LigneDeCommandeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LigneDeCommandeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LigneDeCommandeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LigneDeCommandeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LigneDeCommande('123');
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
        const entity = new LigneDeCommande();
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
