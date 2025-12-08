import { Injectable, signal, effect } from '@angular/core';
import { Procedure } from '../models/procedure.model';

// e.g. { 'pasos-biometrijski': [1, 3], 'licna-karta': [1] }
type ProcedureStepStatus = Record<string, number[]>;

const STEP_STATUS_KEY = 'procedure_step_status';

@Injectable({
  providedIn: 'root'
})
export class ProcedureStateService {
  private stepStatus = signal<ProcedureStepStatus>({});

  constructor() {
    this.loadFromStorage();
    effect(() => {
      this.saveToStorage(this.stepStatus());
    });
  }

  private loadFromStorage() {
    try {
      const storedData = localStorage.getItem(STEP_STATUS_KEY);
      if (storedData) {
        this.stepStatus.set(JSON.parse(storedData));
      }
    } catch (e) {
      console.error('Error loading step status from localStorage', e);
      this.stepStatus.set({});
    }
  }

  private saveToStorage(status: ProcedureStepStatus) {
    try {
      localStorage.setItem(STEP_STATUS_KEY, JSON.stringify(status));
    } catch (e) {
      console.error('Error saving step status to localStorage', e);
    }
  }

  isStepCompleted(procedureId: string, stepNumber: number): boolean {
    const completedSteps = this.stepStatus()[procedureId] || [];
    return completedSteps.includes(stepNumber);
  }

  toggleStepCompletion(procedureId: string, stepNumber: number) {
    this.stepStatus.update(currentStatus => {
      const completedSteps = currentStatus[procedureId] || [];
      const newCompletedSteps = completedSteps.includes(stepNumber)
        ? completedSteps.filter(s => s !== stepNumber)
        : [...completedSteps, stepNumber];
      
      return {
        ...currentStatus,
        [procedureId]: newCompletedSteps
      };
    });
  }
  
  getCompletionPercentage(procedure: Procedure | null | undefined): number {
      if (!procedure || procedure.steps.length === 0) {
          return 0;
      }
      const completedSteps = this.stepStatus()[procedure.id] || [];
      return (completedSteps.length / procedure.steps.length) * 100;
  }
}
