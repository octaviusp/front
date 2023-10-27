import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docente } from '../models/docente.model';
import Config from 'src/config/config';

@Injectable({
  providedIn: 'root'
})

export class DocenteService {

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

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url + this.entity + "/" + id}`);
  }

  deleteAll(docentes: Docente[]): Observable<any> {
    return this.http.delete<any>(`${this.url + this.entity}`, { body: docentes });
  }

  create(docente: Docente): Observable<any> {
    return this.http.post<any>(`${this.url + this.entity}`, docente);
  }
  // Puedes agregar métodos adicionales según tus necesidades, como búsqueda por nombre, etc.
}
