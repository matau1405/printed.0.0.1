import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'produit',
        loadChildren: () => import('./produit/produit.module').then(m => m.TestPrintedV5ProduitModule)
      },
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.TestPrintedV5ClientModule)
      },
      {
        path: 'ligne-de-commande',
        loadChildren: () => import('./ligne-de-commande/ligne-de-commande.module').then(m => m.TestPrintedV5LigneDeCommandeModule)
      },
      {
        path: 'facture',
        loadChildren: () => import('./facture/facture.module').then(m => m.TestPrintedV5FactureModule)
      },
      {
        path: 'expedition',
        loadChildren: () => import('./expedition/expedition.module').then(m => m.TestPrintedV5ExpeditionModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class TestPrintedV5EntityModule {}
