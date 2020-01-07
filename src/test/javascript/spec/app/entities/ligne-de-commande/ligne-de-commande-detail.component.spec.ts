import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestPrintedV5TestModule } from '../../../test.module';
import { LigneDeCommandeDetailComponent } from 'app/entities/ligne-de-commande/ligne-de-commande-detail.component';
import { LigneDeCommande } from 'app/shared/model/ligne-de-commande.model';

describe('Component Tests', () => {
  describe('LigneDeCommande Management Detail Component', () => {
    let comp: LigneDeCommandeDetailComponent;
    let fixture: ComponentFixture<LigneDeCommandeDetailComponent>;
    const route = ({ data: of({ ligneDeCommande: new LigneDeCommande('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestPrintedV5TestModule],
        declarations: [LigneDeCommandeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LigneDeCommandeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LigneDeCommandeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ligneDeCommande).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
