import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestPrintedV5SharedModule } from 'app/shared/shared.module';
import { LigneDeCommandeComponent } from './ligne-de-commande.component';
import { LigneDeCommandeDetailComponent } from './ligne-de-commande-detail.component';
import { LigneDeCommandeUpdateComponent } from './ligne-de-commande-update.component';
import { LigneDeCommandeDeletePopupComponent, LigneDeCommandeDeleteDialogComponent } from './ligne-de-commande-delete-dialog.component';
import { ligneDeCommandeRoute, ligneDeCommandePopupRoute } from './ligne-de-commande.route';

const ENTITY_STATES = [...ligneDeCommandeRoute, ...ligneDeCommandePopupRoute];

@NgModule({
  imports: [TestPrintedV5SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LigneDeCommandeComponent,
    LigneDeCommandeDetailComponent,
    LigneDeCommandeUpdateComponent,
    LigneDeCommandeDeleteDialogComponent,
    LigneDeCommandeDeletePopupComponent
  ],
  entryComponents: [LigneDeCommandeDeleteDialogComponent]
})
export class TestPrintedV5LigneDeCommandeModule {}
