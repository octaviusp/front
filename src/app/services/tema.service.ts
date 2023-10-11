import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tema } from '../models/tema.model'; // Asegúrate de importar el modelo correcto
import Config from 'src/config/config';

@Injectable({
  providedIn: 'root'
})

export class TemaService { // Cambia el nombre del servicio si es necesario

  url = "";
  entity = "temas"; // Ajusta el nombre de la entidad según tu API

  constructor(private http: HttpClient, private config: Config) {
    this.url = this.config.getBaseUrl();
  }

  getAll(): Observable<Tema[]> {
    return this.http.get<Tema[]>(`${this.url + this.entity}`);
  }

}
