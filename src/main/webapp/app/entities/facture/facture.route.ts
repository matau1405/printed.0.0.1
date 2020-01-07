import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Facture } from 'app/shared/model/facture.model';
import { FactureService } from './facture.service';
import { FactureComponent } from './facture.component';
import { FactureDetailComponent } from './facture-detail.component';
import { FactureUpdateComponent } from './facture-update.component';
import { FactureDeletePopupComponent } from './facture-delete-dialog.component';
import { IFacture } from 'app/shared/model/facture.model';

@Injectable({ providedIn: 'root' })
export class FactureResolve implements Resolve<IFacture> {
  constructor(private service: FactureService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFacture> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Facture>) => response.ok),
        map((facture: HttpResponse<Facture>) => facture.body)
      );
    }
    return of(new Facture());
  }
}

export const factureRoute: Routes = [
  {
    path: '',
    component: FactureComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Factures'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FactureDetailComponent,
    resolve: {
      facture: FactureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Factures'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FactureUpdateComponent,
    resolve: {
      facture: FactureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Factures'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FactureUpdateComponent,
    resolve: {
      facture: FactureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Factures'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const facturePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FactureDeletePopupComponent,
    resolve: {
      facture: FactureResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Factures'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
