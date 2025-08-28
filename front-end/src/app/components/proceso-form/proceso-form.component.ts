import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProcesoService } from '../../services/proceso.service';
import { Proceso } from '../../models/proceso.model';

@Component({
  selector: 'app-proceso-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proceso-form.component.html',
  styleUrl: './proceso-form.component.scss'
})
export class ProcesoFormComponent implements OnChanges {
  @Input() proceso: Proceso | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  formData: Proceso = { nombre: '', paso: 1 };
  isEditing = false;
  loading = false;
  error = '';
  success = '';

  constructor(private procesoService: ProcesoService) {}

  ngOnChanges(): void {
    if (this.proceso) {
      this.formData = { ...this.proceso };
      this.isEditing = true;
    } else {
      this.resetForm();
    }
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateProceso();
    } else {
      this.createProceso();
    }
  }

  private createProceso(): void {
    this.loading = true;
    this.error = '';
    this.success = '';

    this.procesoService.createProceso(this.formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.success = 'Proceso creado exitosamente';
          this.resetForm();
          this.saved.emit();
        } else {
          this.error = response.error || 'Error al crear proceso';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Error de conexión';
        this.loading = false;
      }
    });
  }

  private updateProceso(): void {
    if (!this.proceso?.id) return;

    this.loading = true;
    this.error = '';
    this.success = '';

    const updateData = {
      nombre: this.formData.nombre,
      descripcion: this.formData.descripcion
    };

    this.procesoService.updateProceso(this.proceso.id, updateData).subscribe({
      next: (response) => {
        if (response.success) {
          this.success = 'Proceso actualizado exitosamente';
          this.saved.emit();
        } else {
          this.error = response.error || 'Error al actualizar proceso';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Error de conexión';
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.resetForm();
    this.cancelled.emit();
  }

  private resetForm(): void {
    this.formData = { nombre: '', paso: 1 };
    this.isEditing = false;
    this.error = '';
    this.success = '';
  }
}
