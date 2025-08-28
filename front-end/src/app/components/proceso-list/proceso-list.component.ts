import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcesoService } from '../../services/proceso.service';
import { Proceso } from '../../models/proceso.model';

@Component({
  selector: 'app-proceso-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proceso-list.component.html',
  styleUrl: './proceso-list.component.scss'
})
export class ProcesoListComponent implements OnInit {
  @Output() editProceso = new EventEmitter<Proceso>();
  
  procesos: Proceso[] = [];
  loading = false;
  error = '';
  showHistory: { [key: number]: boolean } = {};

  constructor(private procesoService: ProcesoService) {}

  ngOnInit(): void {
    this.loadProcesos();
  }

  refresh(): void {
    this.loadProcesos();
  }

  loadProcesos(): void {
    this.loading = true;
    this.error = '';
    
    this.procesoService.getProcesos().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.procesos = response.data;
        } else {
          this.error = response.error || 'Error al cargar procesos';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error de conexión';
        this.loading = false;
      }
    });
  }

  onEdit(proceso: Proceso): void {
    this.editProceso.emit(proceso);
  }

  toggleHistory(id: number): void {
    this.showHistory[id] = !this.showHistory[id];
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-ES');
  }
}
