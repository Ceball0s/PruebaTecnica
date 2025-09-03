import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Evento } from '../eventos/eventos.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-evento-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './evento-list.html',
  styleUrls: ['./evento-list.css']
})
export class EventoListComponent {
  @Input() eventos: Evento[] = [];
  @Output() ver = new EventEmitter<Evento>();
  @Output() editar = new EventEmitter<Evento>();
  @Output() eliminar = new EventEmitter<number>();

  displayedColumns = ['id', 'nombre', 'descripcion', 'acciones'];
}
