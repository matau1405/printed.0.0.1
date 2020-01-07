import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFacture } from 'app/shared/model/facture.model';
import { FactureService } from './facture.service';

@Component({
  selector: 'jhi-facture-delete-dialog',
  templateUrl: './facture-delete-dialog.component.html'
})
export class FactureDeleteDialogComponent {
  facture: IFacture;

  constructor(protected factureService: FactureService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.factureService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'factureListModification',
        content: 'Deleted an facture'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-facture-delete-popup',
  template: ''
})
export class FactureDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ facture }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FactureDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.facture = facture;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/facture', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/facture', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
