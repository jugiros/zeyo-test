import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcesoListComponent } from './components/proceso-list/proceso-list.component';
import { ProcesoFormComponent } from './components/proceso-form/proceso-form.component';
import { Proceso } from './models/proceso.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProcesoListComponent, ProcesoFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(ProcesoListComponent) procesoList!: ProcesoListComponent;
  
  showForm = false;
  selectedProceso: Proceso | null = null;

  onEditProceso(proceso: Proceso): void {
    this.selectedProceso = proceso;
    this.showForm = true;
  }

  onProcesoSaved(): void {
    this.showForm = false;
    this.selectedProceso = null;
    if (this.procesoList) {
      this.procesoList.refresh();
    }
  }

  onFormCancelled(): void {
    this.showForm = false;
    this.selectedProceso = null;
  }
}
