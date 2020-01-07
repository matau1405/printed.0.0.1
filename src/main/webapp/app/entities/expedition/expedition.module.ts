import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestPrintedV5SharedModule } from 'app/shared/shared.module';
import { ExpeditionComponent } from './expedition.component';
import { ExpeditionDetailComponent } from './expedition-detail.component';
import { ExpeditionUpdateComponent } from './expedition-update.component';
import { ExpeditionDeletePopupComponent, ExpeditionDeleteDialogComponent } from './expedition-delete-dialog.component';
import { expeditionRoute, expeditionPopupRoute } from './expedition.route';

const ENTITY_STATES = [...expeditionRoute, ...expeditionPopupRoute];

@NgModule({
  imports: [TestPrintedV5SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ExpeditionComponent,
    ExpeditionDetailComponent,
    ExpeditionUpdateComponent,
    ExpeditionDeleteDialogComponent,
    ExpeditionDeletePopupComponent
  ],
  entryComponents: [ExpeditionDeleteDialogComponent]
})
export class TestPrintedV5ExpeditionModule {}
