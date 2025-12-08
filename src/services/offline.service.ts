
import { Injectable, signal, effect } from '@angular/core';
import { Procedure } from '../models/procedure.model';

const OFFLINE_KEY = 'offline_procedures';

@Injectable({
  providedIn: 'root'
})
export class OfflineService {
  offlineProcedures = signal<Procedure[]>([]);

  constructor() {
    this.loadFromStorage();
    effect(() => {
      this.saveToStorage(this.offlineProcedures());
    });
  }

  private loadFromStorage() {
    try {
      const storedData = localStorage.getItem(OFFLINE_KEY);
      if (storedData) {
        this.offlineProcedures.set(JSON.parse(storedData));
      }
    } catch (e) {
      console.error('Error loading offline procedures from localStorage', e);
      this.offlineProcedures.set([]);
    }
  }

  private saveToStorage(procedures: Procedure[]) {
    try {
      localStorage.setItem(OFFLINE_KEY, JSON.stringify(procedures));
    } catch (e) {
      console.error('Error saving offline procedures to localStorage', e);
    }
  }

  saveProcedure(procedure: Procedure) {
    if (!this.isSaved(procedure.id)) {
      this.offlineProcedures.update(procedures => [...procedures, procedure]);
    }
  }

  removeProcedure(procedureId: string) {
    this.offlineProcedures.update(procedures => procedures.filter(p => p.id !== procedureId));
  }

  isSaved(procedureId: string): boolean {
    return this.offlineProcedures().some(p => p.id === procedureId);
  }

  getOfflineProcedures() {
    return this.offlineProcedures.asReadonly();
  }
}
