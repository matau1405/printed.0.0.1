import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Expedition } from 'app/shared/model/expedition.model';
import { ExpeditionService } from './expedition.service';
import { ExpeditionComponent } from './expedition.component';
import { ExpeditionDetailComponent } from './expedition-detail.component';
import { ExpeditionUpdateComponent } from './expedition-update.component';
import { ExpeditionDeletePopupComponent } from './expedition-delete-dialog.component';
import { IExpedition } from 'app/shared/model/expedition.model';

@Injectable({ providedIn: 'root' })
export class ExpeditionResolve implements Resolve<IExpedition> {
  constructor(private service: ExpeditionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IExpedition> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Expedition>) => response.ok),
        map((expedition: HttpResponse<Expedition>) => expedition.body)
      );
    }
    return of(new Expedition());
  }
}

export const expeditionRoute: Routes = [
  {
    path: '',
    component: ExpeditionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Expeditions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ExpeditionDetailComponent,
    resolve: {
      expedition: ExpeditionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Expeditions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ExpeditionUpdateComponent,
    resolve: {
      expedition: ExpeditionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Expeditions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ExpeditionUpdateComponent,
    resolve: {
      expedition: ExpeditionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Expeditions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const expeditionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ExpeditionDeletePopupComponent,
    resolve: {
      expedition: ExpeditionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Expeditions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
