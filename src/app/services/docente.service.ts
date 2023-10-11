import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docente } from '../models/docente.model';
import Config from 'src/config/config';

@Injectable({
  providedIn: 'root'
})

export class DocenteService { // Cambia el nombre del servicio si es necesario

  url = "";
  entity = "docentes"; // Ajusta el nombre de la entidad según tu API

  constructor(private http: HttpClient, private config: Config) {
    this.url = this.config.getBaseUrl();
  }

  getAll(): Observable<Docente[]> {
    return this.http.get<Docente[]>(`${this.url + this.entity}`);
  }

  getOne(id: number): Observable<Docente> {
    return this.http.get<Docente>(`${this.url + this.entity + "/" + id}`);
  }

  // Puedes agregar métodos adicionales según tus necesidades, como búsqueda por nombre, etc.
}
