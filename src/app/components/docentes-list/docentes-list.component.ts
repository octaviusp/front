import { Component, OnInit } from '@angular/core';
import { Docente } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente.service';

@Component({
  selector: 'app-docente-list',
  templateUrl: './docentes-list.component.html',
  styleUrls: ['./docentes-list.component.css']
})
export class DocenteListComponent implements OnInit {
  newDocenteName: String = "";
  docentes?: Docente[];
  currentElement: Docente = {};
  currentIndex = -1;
  nombre = ''; // Cambiado de 'title' a 'nombre' para coincidir con el nombre de docente
  all_docentes?: Docente[];

  constructor(private docenteService: DocenteService) { }

  ngOnInit(): void {
    this.retrieveDocentes();
  }

  retrieveDocentes(): void {
    if (this.all_docentes)
      this.docentes = this.all_docentes;
    this.docenteService.getAll()
      .subscribe({
        next: (data) => {
          if (data.length != this.all_docentes?.length)
            this.docentes = data;
        },
        error: (e) => console.error(e)
      });
  }

  addDocente(): void {

    if (this.newDocenteName.length < 3) 
      {
        alert("El nombre del docente tiene que ser mayor a 3 caracteres.")
        return
      }

    const newDocente: Docente = {
      nombre: String(this.newDocenteName),
    }
    this.docenteService.create(newDocente)
      .subscribe({
        next: (res) => {
          this.refreshList();
        },
        error: (e) => alert("No se pudo agregar el docente")
      })
  }

  refreshList(): void {
    this.retrieveDocentes();
    this.currentElement = {};
    this.currentIndex = -1;
  }

  setActiveElement(element: Docente, index: number): void {
    this.currentElement = element;
    this.currentIndex = index;
  }

  removeAllElements(): void {
    if (!this.docentes) {
      console.error("No hay docentes para eliminar.");
      return;
    }

    let docentes_iterable: Docente[] = this.docentes;

    this.docenteService.deleteAll(docentes_iterable)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchName(): void { // Cambiado de 'searchTitle' a 'searchName'
    if (!this.all_docentes)
      this.all_docentes = this.docentes;
    console.log(this.all_docentes);
    const nameRegex = new RegExp(this.nombre, 'i'); 
    this.docentes = this.all_docentes?.filter(docente => nameRegex.test(docente.nombre || ""));
  }

  removeSelectedElement(): void {
    if (!this.currentElement || !this.currentElement.id) {
      console.error("No se ha seleccionado ningún docente para eliminar.");
      return;
    }
  
    this.docenteService.delete(this.currentElement.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
  
}
