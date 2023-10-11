import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso.model';
import { Tema } from 'src/app/models/tema.model';
import { DocenteService } from 'src/app/services/docente.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

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

  
  docente_name = "Sin nombre"
  message = '';
  constructor(
    private cursoService: CursoService,
    private docenteService: DocenteService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getElement(this.route.snapshot.params["id"]);
    }
  }

  getDocenteName(id: number): void {
    this.docenteService.getOne(id).subscribe({
      next: (docente) => {
        console.log(docente.nombre)
        if (id == 0)
          this.docente_name = "Sin nombre"
        else
          this.docente_name = docente.nombre || "Sin nombre"  },
      error: (e) => console.error(e)
    }
      
     ) 
    }
  

    getElement(id: string): void {
      this.cursoService.get(id)
        .pipe(
          switchMap((data: Curso) => {

            this.currentElement = data;
            
            if (this.currentElement.idDocente !== undefined && this.currentElement.idDocente !== null) {
              return this.docenteService.getOne(this.currentElement.idDocente);
            } else {
              // Si no hay idDocente, devolvemos un observable con un valor por defecto
              return of({ nombre: "Sin nombre" });
            }
          })
        )
        .subscribe({
          next: (docente) => {
            this.docente_name = docente.nombre || "Sin nombre";
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
