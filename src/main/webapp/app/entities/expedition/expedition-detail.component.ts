import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExpedition } from 'app/shared/model/expedition.model';

@Component({
  selector: 'jhi-expedition-detail',
  templateUrl: './expedition-detail.component.html'
})
export class ExpeditionDetailComponent implements OnInit {
  expedition: IExpedition;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ expedition }) => {
      this.expedition = expedition;
    });
  }

  previousState() {
    window.history.back();
  }
}
