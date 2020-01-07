import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IProduit } from 'app/shared/model/produit.model';

@Component({
  selector: 'jhi-produit-detail',
  templateUrl: './produit-detail.component.html'
})
export class ProduitDetailComponent implements OnInit {
  produit: IProduit;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ produit }) => {
      this.produit = produit;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
