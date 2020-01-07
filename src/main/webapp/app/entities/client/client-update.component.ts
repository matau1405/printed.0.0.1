import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IClient, Client } from 'app/shared/model/client.model';
import { ClientService } from './client.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-client-update',
  templateUrl: './client-update.component.html'
})
export class ClientUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    prenom: [null, [Validators.required]],
    genre: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.pattern('^[^@s]+@[^@s]+.[^@s]+$')]],
    tel: [null, [Validators.required]],
    addresseLigne1: [null, [Validators.required]],
    addresseLigne2: [],
    ville: [null, [Validators.required]],
    pays: [null, [Validators.required]],
    user: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected clientService: ClientService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ client }) => {
      this.updateForm(client);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(client: IClient) {
    this.editForm.patchValue({
      id: client.id,
      nom: client.nom,
      prenom: client.prenom,
      genre: client.genre,
      email: client.email,
      tel: client.tel,
      addresseLigne1: client.addresseLigne1,
      addresseLigne2: client.addresseLigne2,
      ville: client.ville,
      pays: client.pays,
      user: client.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const client = this.createFromForm();
    if (client.id !== undefined) {
      this.subscribeToSaveResponse(this.clientService.update(client));
    } else {
      this.subscribeToSaveResponse(this.clientService.create(client));
    }
  }

  private createFromForm(): IClient {
    return {
      ...new Client(),
      id: this.editForm.get(['id']).value,
      nom: this.editForm.get(['nom']).value,
      prenom: this.editForm.get(['prenom']).value,
      genre: this.editForm.get(['genre']).value,
      email: this.editForm.get(['email']).value,
      tel: this.editForm.get(['tel']).value,
      addresseLigne1: this.editForm.get(['addresseLigne1']).value,
      addresseLigne2: this.editForm.get(['addresseLigne2']).value,
      ville: this.editForm.get(['ville']).value,
      pays: this.editForm.get(['pays']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClient>>) {
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

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
