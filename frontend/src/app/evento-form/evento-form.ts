import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { Evento } from '../eventos/eventos.service';

type EventoDialog = {
  id?: number;
  nombre: string;
  descripcion?: string;
  fecha_inicio: Date | null;
  fecha_fin: Date | null;
};

@Component({
  selector: 'app-evento-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // Material
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './evento-form.html',
})
export class EventoFormComponent {
  modo: 'crear' | 'editar' = 'crear';
  evento: EventoDialog = {
    nombre: '',
    descripcion: '',
    fecha_inicio: null,
    fecha_fin: null,
  };

  constructor(
    private dialogRef: MatDialogRef<EventoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { modo: 'crear' | 'editar'; evento?: Evento }
  ) {
    this.modo = data.modo;
    if (data.modo === 'editar' && data.evento) {
      this.evento = {
        id: data.evento.id,
        nombre: data.evento.nombre,
        descripcion: data.evento.descripcion ?? '',
        fecha_inicio: data.evento.fecha_inicio ? new Date(data.evento.fecha_inicio) : null,
        fecha_fin: data.evento.fecha_fin ? new Date(data.evento.fecha_fin) : null,
      };
    }
  }

  cancelar() {
    this.dialogRef.close(null);
  }

  guardar() {
    // Validación mínima
    if (!this.evento.nombre || !this.evento.fecha_inicio || !this.evento.fecha_fin) return;

    // Devolvemos el objeto (con Date), el contenedor lo formatea a ISO
    this.dialogRef.close(this.evento);
  }
}
