import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IFacture, Facture } from 'app/shared/model/facture.model';
import { FactureService } from './facture.service';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client/client.service';

@Component({
  selector: 'jhi-facture-update',
  templateUrl: './facture-update.component.html'
})
export class FactureUpdateComponent implements OnInit {
  isSaving: boolean;

  clients: IClient[];

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    date: [null, [Validators.required]],
    details: [],
    statut: [null, [Validators.required]],
    modePaiement: [null, [Validators.required]],
    datePaiement: [null, [Validators.required]],
    motantPaiement: [null, [Validators.required]],
    client: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected factureService: FactureService,
    protected clientService: ClientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ facture }) => {
      this.updateForm(facture);
    });
    this.clientService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClient[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClient[]>) => response.body)
      )
      .subscribe((res: IClient[]) => (this.clients = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(facture: IFacture) {
    this.editForm.patchValue({
      id: facture.id,
      code: facture.code,
      date: facture.date != null ? facture.date.format(DATE_TIME_FORMAT) : null,
      details: facture.details,
      statut: facture.statut,
      modePaiement: facture.modePaiement,
      datePaiement: facture.datePaiement != null ? facture.datePaiement.format(DATE_TIME_FORMAT) : null,
      motantPaiement: facture.motantPaiement,
      client: facture.client
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const facture = this.createFromForm();
    if (facture.id !== undefined) {
      this.subscribeToSaveResponse(this.factureService.update(facture));
    } else {
      this.subscribeToSaveResponse(this.factureService.create(facture));
    }
  }

  private createFromForm(): IFacture {
    return {
      ...new Facture(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      details: this.editForm.get(['details']).value,
      statut: this.editForm.get(['statut']).value,
      modePaiement: this.editForm.get(['modePaiement']).value,
      datePaiement:
        this.editForm.get(['datePaiement']).value != null ? moment(this.editForm.get(['datePaiement']).value, DATE_TIME_FORMAT) : undefined,
      motantPaiement: this.editForm.get(['motantPaiement']).value,
      client: this.editForm.get(['client']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacture>>) {
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

  trackClientById(index: number, item: IClient) {
    return item.id;
  }
}
