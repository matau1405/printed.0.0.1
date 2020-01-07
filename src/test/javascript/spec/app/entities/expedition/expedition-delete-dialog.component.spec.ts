import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestPrintedV5TestModule } from '../../../test.module';
import { ExpeditionDeleteDialogComponent } from 'app/entities/expedition/expedition-delete-dialog.component';
import { ExpeditionService } from 'app/entities/expedition/expedition.service';

describe('Component Tests', () => {
  describe('Expedition Management Delete Component', () => {
    let comp: ExpeditionDeleteDialogComponent;
    let fixture: ComponentFixture<ExpeditionDeleteDialogComponent>;
    let service: ExpeditionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestPrintedV5TestModule],
        declarations: [ExpeditionDeleteDialogComponent]
      })
        .overrideTemplate(ExpeditionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExpeditionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExpeditionService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('123');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('123');
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
