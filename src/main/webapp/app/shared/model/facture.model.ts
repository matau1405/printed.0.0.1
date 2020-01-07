import { Moment } from 'moment';
import { IExpedition } from 'app/shared/model/expedition.model';
import { IClient } from 'app/shared/model/client.model';
import { StatutFacture } from 'app/shared/model/enumerations/statut-facture.model';
import { Mode } from 'app/shared/model/enumerations/mode.model';

export interface IFacture {
  id?: string;
  code?: string;
  date?: Moment;
  details?: string;
  statut?: StatutFacture;
  modePaiement?: Mode;
  datePaiement?: Moment;
  motantPaiement?: number;
  expeditions?: IExpedition[];
  client?: IClient;
}

export class Facture implements IFacture {
  constructor(
    public id?: string,
    public code?: string,
    public date?: Moment,
    public details?: string,
    public statut?: StatutFacture,
    public modePaiement?: Mode,
    public datePaiement?: Moment,
    public motantPaiement?: number,
    public expeditions?: IExpedition[],
    public client?: IClient
  ) {}
}
