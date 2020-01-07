import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILigneDeCommande } from 'app/shared/model/ligne-de-commande.model';
import { LigneDeCommandeService } from './ligne-de-commande.service';

@Component({
  selector: 'jhi-ligne-de-commande-delete-dialog',
  templateUrl: './ligne-de-commande-delete-dialog.component.html'
})
export class LigneDeCommandeDeleteDialogComponent {
  ligneDeCommande: ILigneDeCommande;

  constructor(
    protected ligneDeCommandeService: LigneDeCommandeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.ligneDeCommandeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'ligneDeCommandeListModification',
        content: 'Deleted an ligneDeCommande'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ligne-de-commande-delete-popup',
  template: ''
})
export class LigneDeCommandeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ligneDeCommande }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LigneDeCommandeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.ligneDeCommande = ligneDeCommande;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/ligne-de-commande', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/ligne-de-commande', { outlets: { popup: null } }]);
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
