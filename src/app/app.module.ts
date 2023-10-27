import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursoAddComponent } from './components/curso-add/curso-add.component';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { CursoDetailsComponent } from './components/curso-details/curso-details.component';
import { DocenteListComponent } from './components/docentes-list/docentes-list.component';
import Config from 'src/config/config';
import { TemaListComponent } from './components/tema-list/temas-list.component';


@NgModule({
  declarations: [
    AppComponent,
    CursoAddComponent,
    CursoListComponent,
    CursoDetailsComponent,
    DocenteListComponent,
    TemaListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [Config],
  bootstrap: [AppComponent]
})
export class AppModule { }

