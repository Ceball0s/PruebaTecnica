import { Component, OnInit } from '@angular/core';
import { EventosService, Evento } from './eventos.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
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


  constructor(private eventosService: EventosService) {}

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