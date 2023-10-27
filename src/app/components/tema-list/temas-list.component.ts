import { Component, OnInit } from '@angular/core';
import { Tema } from 'src/app/models/tema.model';
import { TemaService } from 'src/app/services/tema.service';

@Component({
  selector: 'app-tema-list',
  templateUrl: './temas-list.component.html',
  styleUrls: ['./temas-list.component.css']
})
export class TemaListComponent implements OnInit {
  newTemaName: string = ""; // Usar 'string' en lugar de 'String'
  newTemaDuracion: number = 0;
  temas?: Tema[];
  currentTema: Tema = {}; // Cambiado de 'currentElement' a 'currentTema' para ser más descriptivo
  currentIndex = -1;
  nombre = ''; // Para buscar por el nombre del tema

  constructor(private temaService: TemaService) { }

  ngOnInit(): void {
    this.retrieveTemas();
  }

  retrieveTemas(): void {
    this.temaService.getAll()
      .subscribe({
        next: (data) => {
          this.temas = data;
          console.log(this.temas)
        },
        error: (e) => console.error(e)
      });
  }

  addTema(): void {
    // Validación
    if (this.newTemaName.length < 2) {
      alert("El nombre del tema debe tener al menos 2 caracteres.");
      return;
    }
  
    if (this.newTemaDuracion <= 0) {
      alert("La duración del tema debe ser mayor que 0.");
      return;
    }
  
    // Lógica para agregar un nuevo tema basándose en 'newTemaName'
    const newTema: Tema = {
      nombre: this.newTemaName || "",
      duracion: this.newTemaDuracion || 0
      // Agregar más campos si es necesario
    };
  
    this.temaService.add(newTema)
      .subscribe({
        next: (res) => {
          this.refreshList();
        },
        error: (e) => alert("El tema no pudo ser agregado")
      })
  }

  refreshList(): void {
    this.retrieveTemas();
  }


  setActiveTema(tema: Tema, index: number): void {
    this.currentTema = tema;
    this.currentIndex = index;
  }



  searchName(): void {
    this.temaService.getAll()
      .subscribe({
        next: (data) => {
          const nameRegex = new RegExp(this.nombre, 'i'); 
          this.temas = data.filter(tema => nameRegex.test(tema.nombre || ""));
        },
        error: (e) => console.error(e)
      });
  }

  removeAll(): void {
    if (this.temas) {
      this.temaService.deleteAll(this.temas)
      .subscribe({
        next: (res) => {
          this.refreshList()
        },
        error: (e) => console.error(e)
      })
    }

  }

  removeSelectedTema(): void {
    if (!this.currentTema || !this.currentTema.id) {
      console.error("No se ha seleccionado ningún tema para eliminar.");
      return;
    }
  
    this.temaService.delete(this.currentTema.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.retrieveTemas();
        },
        error: (e) => console.error(e)
      });
  }
}
