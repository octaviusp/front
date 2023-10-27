import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tema } from '../models/tema.model';
import Config from 'src/config/config';

@Injectable({
  providedIn: 'root'
})

export class TemaService {

  url = "";
  entity = "temas"; // Ajusta el nombre de la entidad según tu API

  constructor(private http: HttpClient, private config: Config) {
    this.url = this.config.getBaseUrl();
  }

  add(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>(`${this.url + this.entity}`, tema);
  }

  getAll(): Observable<Tema[]> {
    return this.http.get<Tema[]>(`${this.url + this.entity}`);
  }

  getOne(id: number): Observable<Tema> {
    return this.http.get<Tema>(`${this.url + this.entity + "/" + id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url + this.entity + "/" + id}`);
  }

  deleteAll(temas: Tema[]): Observable<any> {
    return this.http.delete<any>(`${this.url + this.entity}`, { body: temas});
  }

  // Puedes agregar métodos adicionales según tus necesidades, como búsqueda por nombre, etc.
}
