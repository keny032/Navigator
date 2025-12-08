
import { Injectable, signal } from '@angular/core';
import { Procedure, Category } from '../models/procedure.model';
import { PROCEDURES_DATA } from './procedure.data';
import { of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {
  private procedures = signal<Procedure[]>([]);
  
  constructor() {
    // Simulate fetching data from a remote source
    setTimeout(() => {
        this.procedures.set(PROCEDURES_DATA);
    }, 500);
  }

  getProcedures() {
    return this.procedures.asReadonly();
  }

  getProcedureById(id: string) {
    // In a real app, this might be an API call.
    const found = PROCEDURES_DATA.find(p => p.id === id);
    return of(found).pipe(delay(200)); // Simulate network delay
  }

  getCategories(): Category[] {
    return Object.values(Category);
  }
}
