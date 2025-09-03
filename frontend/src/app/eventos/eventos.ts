import { Component, OnInit } from '@angular/core';
import { EventosService, Evento } from './eventos.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { EventoListComponent } from '../evento-list/evento-list';
import { EventoFormComponent } from '../evento-form/evento-form';
import { EventoDetalleComponent } from '../evento-detalle/evento-detalle';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-evento',
  standalone: true,
   imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    // Material
    // Material
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    // Hijos
    EventoListComponent,
    EventoDetalleComponent,
    //calendario
    MatDatepickerModule,
    MatNativeDateModule,


  ],
  templateUrl: './eventos.html',
  styleUrls: ['./eventos.css']
})
export class Eventos implements OnInit {
  eventos: Evento[] = [];
  nuevoEvento: Evento = {
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: ''
  };
  mostrarFormulario = false;
  eventoSeleccionado: Evento | null = null;  
  editandoEvento: Evento | null = null;     


  constructor(private eventosService: EventosService, private dialog: MatDialog) {}

  // ====== MODAL: CREAR ======
  abrirFormularioCrear() {
    const ref = this.dialog.open(EventoFormComponent, {
      width: '460px',
      data: { modo: 'crear' },
      disableClose: true,
    });

    ref.afterClosed().subscribe((result) => {
      if (!result) return; // cancelado
      const eventoFormateado = {
        ...result,
        fecha_inicio: new Date(result.fecha_inicio).toISOString(),
        fecha_fin: new Date(result.fecha_fin).toISOString(),
      };
      this.eventosService.createEvento(eventoFormateado).subscribe(() => {
        this.cargarEventos();
      });
    });
  }

  // ====== MODAL: EDITAR ======
  abrirFormularioEditar(evento: Evento) {
    const ref = this.dialog.open(EventoFormComponent, {
      width: '460px',
      data: { modo: 'editar', evento },
      disableClose: true,
    });

    ref.afterClosed().subscribe((result) => {
      if (!result) return; // cancelado
      const { id, ...resto } = result;
      const eventoFormateado = {
        ...resto,
        fecha_inicio: new Date(resto.fecha_inicio).toISOString(),
        fecha_fin: new Date(resto.fecha_fin).toISOString(),
      };
      this.eventosService.updateEvento(id!, eventoFormateado).subscribe(() => {
        this.cargarEventos();
      });
    });
  }




  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos() {
    this.eventosService.getEventos().subscribe(data => this.eventos = data);
  }

  crearEvento() {
    const eventoFormateado = {
      ...this.nuevoEvento,
      fecha_inicio: new Date(this.nuevoEvento.fecha_inicio).toISOString(),
      fecha_fin: new Date(this.nuevoEvento.fecha_fin).toISOString(),
    };

    this.eventosService.createEvento(eventoFormateado).subscribe(() => {
      this.nuevoEvento = { nombre: '', descripcion: '', fecha_inicio: '', fecha_fin: '' };
      this.cargarEventos();
    });
  }



  verEvento(evento: Evento) {
    this.eventosService.getEvento(evento.id!).subscribe(data => {
      this.eventoSeleccionado = data;
    });
  }

  

  editarEvento(evento: Evento) {
    // Cargamos los datos en el formulario de edición
    this.editandoEvento = { ...evento };
  }

  guardarEdicion() {
    if (!this.editandoEvento) return;

    // Extraemos id y quitamos del body
    const { id, ...resto } = this.editandoEvento;

    // Formateamos fechas
    const eventoFormateado = {
      ...resto,
      fecha_inicio: new Date(resto.fecha_inicio).toISOString(),
      fecha_fin: new Date(resto.fecha_fin).toISOString(),
    };

    this.eventosService.updateEvento(id!, eventoFormateado)
      .subscribe(() => {
        this.editandoEvento = null;
        this.cargarEventos();
      });
  }


  eliminarEvento(id: number) {
    if (confirm('¿Seguro que quieres borrar este evento?')) {
      this.eventosService.deleteEvento(id).subscribe(() => this.cargarEventos());
    }
  }
}