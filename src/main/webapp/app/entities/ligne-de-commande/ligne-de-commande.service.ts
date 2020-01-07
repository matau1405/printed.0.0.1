import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILigneDeCommande } from 'app/shared/model/ligne-de-commande.model';

type EntityResponseType = HttpResponse<ILigneDeCommande>;
type EntityArrayResponseType = HttpResponse<ILigneDeCommande[]>;

@Injectable({ providedIn: 'root' })
export class LigneDeCommandeService {
  public resourceUrl = SERVER_API_URL + 'api/ligne-de-commandes';

  constructor(protected http: HttpClient) {}

  create(ligneDeCommande: ILigneDeCommande): Observable<EntityResponseType> {
    return this.http.post<ILigneDeCommande>(this.resourceUrl, ligneDeCommande, { observe: 'response' });
  }

  update(ligneDeCommande: ILigneDeCommande): Observable<EntityResponseType> {
    return this.http.put<ILigneDeCommande>(this.resourceUrl, ligneDeCommande, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ILigneDeCommande>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILigneDeCommande[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
