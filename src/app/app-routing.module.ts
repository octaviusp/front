import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { CursoDetailsComponent } from './components/curso-details/curso-details.component';
import { CursoAddComponent } from './components/curso-add/curso-add.component';
import { DocenteListComponent } from './components/docentes-list/docentes-list.component';
import { TemaListComponent } from './components/tema-list/temas-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'cursos', pathMatch: 'full' },
  { path: 'cursos', component: CursoListComponent },
  { path: 'cursos/:id', component: CursoDetailsComponent },
  { path: 'add', component: CursoAddComponent },
  { path: 'docentes', component: DocenteListComponent},
  { path: 'temas', component: TemaListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
