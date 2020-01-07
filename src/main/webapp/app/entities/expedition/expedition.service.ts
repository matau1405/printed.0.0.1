import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExpedition } from 'app/shared/model/expedition.model';

type EntityResponseType = HttpResponse<IExpedition>;
type EntityArrayResponseType = HttpResponse<IExpedition[]>;

@Injectable({ providedIn: 'root' })
export class ExpeditionService {
  public resourceUrl = SERVER_API_URL + 'api/expeditions';

  constructor(protected http: HttpClient) {}

  create(expedition: IExpedition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(expedition);
    return this.http
      .post<IExpedition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(expedition: IExpedition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(expedition);
    return this.http
      .put<IExpedition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IExpedition>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IExpedition[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(expedition: IExpedition): IExpedition {
    const copy: IExpedition = Object.assign({}, expedition, {
      date: expedition.date != null && expedition.date.isValid() ? expedition.date.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((expedition: IExpedition) => {
        expedition.date = expedition.date != null ? moment(expedition.date) : null;
      });
    }
    return res;
  }
}
