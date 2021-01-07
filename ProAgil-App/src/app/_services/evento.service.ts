import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../_models/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  baseUrl = 'http://localhost:5000/api/evento';

constructor(private http: HttpClient) { }

getAllEvento(): Observable<Evento[]> {
  return this.http.get<Evento[]>(this.baseUrl);
}

GetEventoByTema(tema: string): Observable<Evento[]> {
  return this.http.get<Evento[]>(`${this.baseUrl}/getByTema/${tema}`);
}

getEventoById(id: number): Observable<Evento[]> {
  return this.http.get<Evento[]>(`${this.baseUrl}/${id}`);
}

postEvento(evento: Evento) {
  return this.http.post(this.baseUrl, evento);
}

putEvento(evento: Evento) {
  return this.http.put(`${this.baseUrl}/${evento.id}`, evento);
}

deleteEvento(id: number) {
  return this.http.delete(`${this.baseUrl}/${id}`);
}

}
