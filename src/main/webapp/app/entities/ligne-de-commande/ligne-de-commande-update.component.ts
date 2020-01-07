import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ILigneDeCommande, LigneDeCommande } from 'app/shared/model/ligne-de-commande.model';
import { LigneDeCommandeService } from './ligne-de-commande.service';
import { IProduit } from 'app/shared/model/produit.model';
import { ProduitService } from 'app/entities/produit/produit.service';

@Component({
  selector: 'jhi-ligne-de-commande-update',
  templateUrl: './ligne-de-commande-update.component.html'
})
export class LigneDeCommandeUpdateComponent implements OnInit {
  isSaving: boolean;

  produits: IProduit[];

  editForm = this.fb.group({
    id: [],
    quantite: [null, [Validators.required, Validators.min(0)]],
    ptixTotal: [null, [Validators.required, Validators.min(0)]],
    statut: [null, [Validators.required]],
    produit: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ligneDeCommandeService: LigneDeCommandeService,
    protected produitService: ProduitService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ligneDeCommande }) => {
      this.updateForm(ligneDeCommande);
    });
    this.produitService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProduit[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProduit[]>) => response.body)
      )
      .subscribe((res: IProduit[]) => (this.produits = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(ligneDeCommande: ILigneDeCommande) {
    this.editForm.patchValue({
      id: ligneDeCommande.id,
      quantite: ligneDeCommande.quantite,
      ptixTotal: ligneDeCommande.ptixTotal,
      statut: ligneDeCommande.statut,
      produit: ligneDeCommande.produit
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ligneDeCommande = this.createFromForm();
    if (ligneDeCommande.id !== undefined) {
      this.subscribeToSaveResponse(this.ligneDeCommandeService.update(ligneDeCommande));
    } else {
      this.subscribeToSaveResponse(this.ligneDeCommandeService.create(ligneDeCommande));
    }
  }

  private createFromForm(): ILigneDeCommande {
    return {
      ...new LigneDeCommande(),
      id: this.editForm.get(['id']).value,
      quantite: this.editForm.get(['quantite']).value,
      ptixTotal: this.editForm.get(['ptixTotal']).value,
      statut: this.editForm.get(['statut']).value,
      produit: this.editForm.get(['produit']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILigneDeCommande>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackProduitById(index: number, item: IProduit) {
    return item.id;
  }
}
