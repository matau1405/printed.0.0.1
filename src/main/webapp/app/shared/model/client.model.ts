import { IUser } from 'app/core/user/user.model';
import { IFacture } from 'app/shared/model/facture.model';
import { Genre } from 'app/shared/model/enumerations/genre.model';

export interface IClient {
  id?: string;
  nom?: string;
  prenom?: string;
  genre?: Genre;
  email?: string;
  tel?: string;
  addresseLigne1?: string;
  addresseLigne2?: string;
  ville?: string;
  pays?: string;
  user?: IUser;
  commandes?: IFacture[];
}

export class Client implements IClient {
  constructor(
    public id?: string,
    public nom?: string,
    public prenom?: string,
    public genre?: Genre,
    public email?: string,
    public tel?: string,
    public addresseLigne1?: string,
    public addresseLigne2?: string,
    public ville?: string,
    public pays?: string,
    public user?: IUser,
    public commandes?: IFacture[]
  ) {}
}
