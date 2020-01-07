import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExpedition } from 'app/shared/model/expedition.model';
import { ExpeditionService } from './expedition.service';

@Component({
  selector: 'jhi-expedition-delete-dialog',
  templateUrl: './expedition-delete-dialog.component.html'
})
export class ExpeditionDeleteDialogComponent {
  expedition: IExpedition;

  constructor(
    protected expeditionService: ExpeditionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.expeditionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'expeditionListModification',
        content: 'Deleted an expedition'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-expedition-delete-popup',
  template: ''
})
export class ExpeditionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ expedition }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ExpeditionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.expedition = expedition;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/expedition', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/expedition', { outlets: { popup: null } }]);
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
