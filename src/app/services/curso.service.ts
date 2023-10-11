import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso.model';
import Config from 'src/config/config';



@Injectable({
  providedIn: 'root'
})

export class CursoService {

  url = ""
  entity = "cursos"

  constructor(private http: HttpClient, private config: Config) {
    this.url = this.config.getBaseUrl();
   }
  
  getAll(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.url + this.entity);
  }

  get(id: any): Observable<Curso> {
    return this.http.get<Curso>(`${this.url + this.entity}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.url + this.entity}`, data, {responseType: 'text'});
  }

  update(id: any, data: Curso): Observable<any> {
	const bodyData = {
		"id": id,
    	"nombre": data.nombre,
    	"fechaInicio": data.fechaInicio,
    	"idDocente": data.idDocente ,
    	"tema": data.tema
	};
    return this.http.put(`${this.url + this.entity}`, bodyData, {responseType: 'text'});
  }

  delete(curso: Curso): Observable<any> {
    let cursos: Iterable<Curso> = [curso];
    return this.http.delete(`${this.url + this.entity}`, { body: cursos, responseType: 'text' });
  }

  deleteAll(cursos :Iterable<Curso>): Observable<any> {
    return this.http.delete(`${this.url + this.entity}`, { body: cursos, responseType: 'text' });
  }


}
