import { IProduit } from 'app/shared/model/produit.model';
import { StatutArticleComd } from 'app/shared/model/enumerations/statut-article-comd.model';

export interface ILigneDeCommande {
  id?: string;
  quantite?: number;
  ptixTotal?: number;
  statut?: StatutArticleComd;
  produit?: IProduit;
}

export class LigneDeCommande implements ILigneDeCommande {
  constructor(
    public id?: string,
    public quantite?: number,
    public ptixTotal?: number,
    public statut?: StatutArticleComd,
    public produit?: IProduit
  ) {}
}
