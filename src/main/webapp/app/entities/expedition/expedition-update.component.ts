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
import { IExpedition, Expedition } from 'app/shared/model/expedition.model';
import { ExpeditionService } from './expedition.service';
import { IFacture } from 'app/shared/model/facture.model';
import { FactureService } from 'app/entities/facture/facture.service';

@Component({
  selector: 'jhi-expedition-update',
  templateUrl: './expedition-update.component.html'
})
export class ExpeditionUpdateComponent implements OnInit {
  isSaving: boolean;

  factures: IFacture[];

  editForm = this.fb.group({
    id: [],
    codeSuivi: [],
    date: [null, [Validators.required]],
    details: [],
    facture: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected expeditionService: ExpeditionService,
    protected factureService: FactureService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ expedition }) => {
      this.updateForm(expedition);
    });
    this.factureService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IFacture[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFacture[]>) => response.body)
      )
      .subscribe((res: IFacture[]) => (this.factures = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(expedition: IExpedition) {
    this.editForm.patchValue({
      id: expedition.id,
      codeSuivi: expedition.codeSuivi,
      date: expedition.date != null ? expedition.date.format(DATE_TIME_FORMAT) : null,
      details: expedition.details,
      facture: expedition.facture
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const expedition = this.createFromForm();
    if (expedition.id !== undefined) {
      this.subscribeToSaveResponse(this.expeditionService.update(expedition));
    } else {
      this.subscribeToSaveResponse(this.expeditionService.create(expedition));
    }
  }

  private createFromForm(): IExpedition {
    return {
      ...new Expedition(),
      id: this.editForm.get(['id']).value,
      codeSuivi: this.editForm.get(['codeSuivi']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      details: this.editForm.get(['details']).value,
      facture: this.editForm.get(['facture']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExpedition>>) {
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

  trackFactureById(index: number, item: IFacture) {
    return item.id;
  }
}
