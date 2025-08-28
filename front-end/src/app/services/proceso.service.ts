import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proceso, ApiResponse } from '../models/proceso.model';
import { API_ENDPOINTS } from '../config/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {
  private readonly baseUrl = API_ENDPOINTS.BASE_URL;

  getProcesos(): Observable<ApiResponse<Proceso[]>> {
    return new Observable(observer => {
      fetch(`${this.baseUrl}${API_ENDPOINTS.PROCESOS.GET_ALL}`)
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  createProceso(proceso: Proceso): Observable<ApiResponse<Proceso>> {
    return new Observable(observer => {
      fetch(`${this.baseUrl}${API_ENDPOINTS.PROCESOS.CREATE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(proceso)
      })
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  updateProceso(id: number, proceso: Partial<Proceso>): Observable<ApiResponse<Proceso>> {
    return new Observable(observer => {
      fetch(`${this.baseUrl}${API_ENDPOINTS.PROCESOS.UPDATE(id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(proceso)
      })
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}
