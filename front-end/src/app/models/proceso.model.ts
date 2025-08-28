export interface Proceso {
  id?: number;
  nombre: string;
  descripcion?: string;
  paso: number;
  historial_cambios?: HistorialCambio[];
  hash_anterior?: string;
  hash_actual?: string;
  fecha_creacion?: string;
  fecha_modificacion?: string;
}

export interface HistorialCambio {
  fecha: string;
  accion: string;
  cambios?: any;
  hash: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp?: string;
}
