import { Taille } from 'app/shared/model/enumerations/taille.model';

export interface IProduit {
  id?: string;
  nom?: string;
  description?: string;
  prix?: number;
  taille?: Taille;
  imageContentType?: string;
  image?: any;
  personnalisable?: boolean;
  imagePersoContentType?: string;
  imagePerso?: any;
}

export class Produit implements IProduit {
  constructor(
    public id?: string,
    public nom?: string,
    public description?: string,
    public prix?: number,
    public taille?: Taille,
    public imageContentType?: string,
    public image?: any,
    public personnalisable?: boolean,
    public imagePersoContentType?: string,
    public imagePerso?: any
  ) {
    this.personnalisable = this.personnalisable || false;
  }
}
