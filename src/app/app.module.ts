import { BaseModule } from './shared/modules/base/base.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { SideNavComponent } from './shared/components/side-nav/side-nav.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    FooterComponent,
  ],
  imports: [
    BaseModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
