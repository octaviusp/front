import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso.model';
import { DocenteService } from 'src/app/services/docente.service';
import { Docente } from 'src/app/models/docente.model';

@Component({
  selector: 'app-curso-details',
  templateUrl: './curso-details.component.html',
  styleUrls: ['./curso-details.component.css']
})
export class CursoDetailsComponent implements OnInit {
  
  @Input() viewMode = false;
  @Input() currentElement: Curso = <Curso>{
    title: '',
    status: 'draft',
    content: ''
  };

  docentes: Docente[] = []
  nombreDocente = "Sin nombre"
  message = '';
  constructor(
    private cursoService: CursoService,
    private docenteService: DocenteService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getDocentes();
      this.getElement(this.route.snapshot.params["id"]);
    }
  }

  getDocentes(): void {
    this.docenteService.getAll().subscribe({
      next: (docentes) => {
        this.docentes = docentes
      },
      error: (e) => console.error(e)
    }
      
     ) 
    
  }

    getElement(id: string): void {
      this.cursoService.get(id)
        .subscribe({
          next: (curso) => {
            let docente = this.docentes.find(x => x.id == curso.idDocente)
            if (docente)
              this.nombreDocente = docente.nombre || "Without"
              this.currentElement = curso;

          },
          error: (e) => console.error(e)
        });
    }
    
    

  updateElement(): void {
    this.message = '';
    this.cursoService.update(this.currentElement.id, this.currentElement)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'Curso actualizado!';
          //this.router.navigate(['/cursos']);
        },
        error: (e) => console.error(e)
      });
  }
  deleteElement(): void {
    
    let curso: Curso = {
      "id": this.currentElement.id,
      "nombre": this.currentElement.nombre,
      "tema": this.currentElement.tema,
      "fechaInicio": this.currentElement.fechaInicio,
      "idDocente": this.currentElement.idDocente
    }

    
    this.cursoService.delete(curso)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/cursos']);
        },
        error: (e) => { console.error(e)
        this.router.navigate(['/cursos']) }
      });
  }
}
