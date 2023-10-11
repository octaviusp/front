import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { Docente } from 'src/app/models/docente.model';
import { Tema } from 'src/app/models/tema.model';
import { CursoService } from 'src/app/services/curso.service';
import { DocenteService } from 'src/app/services/docente.service';
import { TemaService } from 'src/app/services/tema.service';

@Component({
  selector: 'app-curso-add',
  templateUrl: './curso-add.component.html',
  styleUrls: ['./curso-add.component.css']
})
export class CursoAddComponent implements OnInit {
  curso: Curso = <Curso>{
    nombre: '',
    fechaInicio: new Date(),
    idDocente: 1, //campo obligatorio
  };
  selected_tema = 1
  submitted = false;
  docentes: Docente[] = [];
  temas: Tema[] = [];
  
  constructor(private cursoService: CursoService, private docenteService: DocenteService, private temaService: TemaService) { }
  ngOnInit(): void {
    this.getDocentes();
    this.getTemas();
  }

  getTemas(): void {
    this.temaService.getAll()
      .subscribe({
        next: (data) => {
          this.temas = data;
        },
        error: (e) => alert(e)
      })
  }

  getDocentes(): void {
    this.docenteService.getAll()
      .subscribe({
        next: (data) => {
          this.docentes = data;
          console.log(this.docentes);
        },
        error: (e) => alert(e)
      });
  }

  saveCurso(): void {
    const data = {
      "id": this.curso.id,
      "nombre": this.curso.nombre,
      "fechaInicio": this.curso.fechaInicio,
      "idDocente": this.curso.idDocente,
      "tema": {
        "id": this.selected_tema
      }
    };    
    this.cursoService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) =>
        {
          console.error(e);
        } 
      });
  }

  newCurso(): void {
    this.submitted = false;
    this.curso = <Curso>{
      nombre: '',
      fechaInicio: new Date(),
      idDocente: 1, //campo obligatorio
    };
  }
}
