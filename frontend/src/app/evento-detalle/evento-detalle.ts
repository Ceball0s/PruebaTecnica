import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Evento } from '../eventos/eventos.service';
import { CommonModule, DatePipe } from '@angular/common';


@Component({
  selector: 'app-evento-detalle',
  standalone: true,
  templateUrl: './evento-detalle.html',
  imports: [CommonModule, DatePipe],
})

export class EventoDetalleComponent {
  @Input() evento: Evento | null = null;
  @Output() cerrar = new EventEmitter<void>();
}
