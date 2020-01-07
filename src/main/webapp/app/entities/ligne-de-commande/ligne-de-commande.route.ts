import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LigneDeCommande } from 'app/shared/model/ligne-de-commande.model';
import { LigneDeCommandeService } from './ligne-de-commande.service';
import { LigneDeCommandeComponent } from './ligne-de-commande.component';
import { LigneDeCommandeDetailComponent } from './ligne-de-commande-detail.component';
import { LigneDeCommandeUpdateComponent } from './ligne-de-commande-update.component';
import { LigneDeCommandeDeletePopupComponent } from './ligne-de-commande-delete-dialog.component';
import { ILigneDeCommande } from 'app/shared/model/ligne-de-commande.model';

@Injectable({ providedIn: 'root' })
export class LigneDeCommandeResolve implements Resolve<ILigneDeCommande> {
  constructor(private service: LigneDeCommandeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILigneDeCommande> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<LigneDeCommande>) => response.ok),
        map((ligneDeCommande: HttpResponse<LigneDeCommande>) => ligneDeCommande.body)
      );
    }
    return of(new LigneDeCommande());
  }
}

export const ligneDeCommandeRoute: Routes = [
  {
    path: '',
    component: LigneDeCommandeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'LigneDeCommandes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LigneDeCommandeDetailComponent,
    resolve: {
      ligneDeCommande: LigneDeCommandeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'LigneDeCommandes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LigneDeCommandeUpdateComponent,
    resolve: {
      ligneDeCommande: LigneDeCommandeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'LigneDeCommandes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LigneDeCommandeUpdateComponent,
    resolve: {
      ligneDeCommande: LigneDeCommandeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'LigneDeCommandes'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ligneDeCommandePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: LigneDeCommandeDeletePopupComponent,
    resolve: {
      ligneDeCommande: LigneDeCommandeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'LigneDeCommandes'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
