import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';


@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})
export class CursoListComponent implements OnInit {
  cursos?: Curso[];
  currentElement: Curso = {};
  currentIndex = -1;
  title = '';
  all_cursos?: Curso[];

  constructor(private cursoService: CursoService) { }
  ngOnInit(): void {
    this.retrieveCursos();
  }
  
  retrieveCursos(): void {
    if (this.all_cursos)
      this.cursos = this.all_cursos
    this.cursoService.getAll()
      .subscribe({
        next: (data) => {
          if (data.length != this.all_cursos?.length) 
            this.cursos = data;
        },
        error: (e) => console.error(e)
      });
  }
  refreshList(): void {
    this.retrieveCursos();
    this.currentElement = {};
    this.currentIndex = -1;
  }
  setActiveElement(element: Curso, index: number): void {
    this.currentElement = element;
    this.currentIndex = index;
  }
  removeAllElements(): void {
    if (!this.cursos) {
      console.error("No hay cursos para eliminar.");
      return;
    }
  
    // Si `this.cursos` es ya un array, simplemente lo asignas
    let cursos_iterable: Curso[] = this.cursos;
  
    this.cursoService.deleteAll(cursos_iterable)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
  
  searchTitle(): void {
    if (!this.all_cursos)
      this.all_cursos = this.cursos;
    console.log(this.all_cursos)
    const titleRegex = new RegExp(this.title, 'i'); // 'i' indica insensibilidad a mayúsculas y minúsculas
    this.cursos = this.all_cursos?.filter(curso => titleRegex.test(curso.nombre || ""));
  }
  
}
