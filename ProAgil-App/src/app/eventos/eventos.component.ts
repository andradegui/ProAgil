import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventosFiltrados: Evento[];
  eventos: Evento[];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  modalRef: BsModalRef;


// tslint:disable-next-line: variable-name
_filtroLista: string;

constructor(
  private eventoService: EventoService
 , private modalService: BsModalService
  ) { }

get filtroLista(): string {
  return this._filtroLista;
}
set filtroLista(value: string) {
  this._filtroLista = value;
  this.eventosFiltrados = this.filtroLista ? this.filtrarEvento(this.filtroLista) : this.eventos;
}

openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getEventos();
  }

  filtrarEvento(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  // tslint:disable-next-line: typedef
  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  // tslint:disable-next-line: typedef
  getEventos() {
   this.eventoService.getAllEvento().subscribe(
      (_eventos : Evento[])=> {
     this.eventos = _eventos;
     this.eventosFiltrados = this.eventos;
     console.log(_eventos);
   }, error => {
     console.log(error);
   } );
  }

}
