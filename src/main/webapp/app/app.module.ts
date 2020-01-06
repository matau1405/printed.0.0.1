import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { TestPrintedV5SharedModule } from 'app/shared/shared.module';
import { TestPrintedV5CoreModule } from 'app/core/core.module';
import { TestPrintedV5AppRoutingModule } from './app-routing.module';
import { TestPrintedV5HomeModule } from './home/home.module';
import { TestPrintedV5EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    TestPrintedV5SharedModule,
    TestPrintedV5CoreModule,
    TestPrintedV5HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    TestPrintedV5EntityModule,
    TestPrintedV5AppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class TestPrintedV5AppModule {}
