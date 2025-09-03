import { Component } from '@angular/core';
// Update the import path if the file is named 'eventos.ts' or located elsewhere
import { Eventos } from './eventos/eventos';
import { provideAnimations } from '@angular/platform-browser/animations'; // 👈 AÑADIR

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Eventos],
  template: `<app-evento></app-evento>`,
  styleUrls: ['./app.css']
})
export class App {}
