import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILigneDeCommande } from 'app/shared/model/ligne-de-commande.model';

@Component({
  selector: 'jhi-ligne-de-commande-detail',
  templateUrl: './ligne-de-commande-detail.component.html'
})
export class LigneDeCommandeDetailComponent implements OnInit {
  ligneDeCommande: ILigneDeCommande;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ligneDeCommande }) => {
      this.ligneDeCommande = ligneDeCommande;
    });
  }

  previousState() {
    window.history.back();
  }
}
