import { Moment } from 'moment';
import { IFacture } from 'app/shared/model/facture.model';

export interface IExpedition {
  id?: string;
  codeSuivi?: string;
  date?: Moment;
  details?: string;
  facture?: IFacture;
}

export class Expedition implements IExpedition {
  constructor(public id?: string, public codeSuivi?: string, public date?: Moment, public details?: string, public facture?: IFacture) {}
}
