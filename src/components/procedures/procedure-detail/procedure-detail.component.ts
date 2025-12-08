import { Component, ChangeDetectionStrategy, inject, signal, effect, computed } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, map } from 'rxjs/operators';
import { ProcedureService } from '../../../services/procedure.service';
import { OfflineService } from '../../../services/offline.service';
import { ProcedureStateService } from '../../../services/procedure-state.service';
import { Procedure } from '../../../models/procedure.model';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-procedure-detail',
  templateUrl: './procedure-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, LoaderComponent],
})
export class ProcedureDetailComponent {
  route = inject(ActivatedRoute);
  procedureService = inject(ProcedureService);
  offlineService = inject(OfflineService);
  procedureStateService = inject(ProcedureStateService);
  
  procedure = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('id')!),
      switchMap(id => this.procedureService.getProcedureById(id))
    )
  );

  isSavedOffline = signal(false);
  
  completionPercentage = computed(() => {
    return this.procedureStateService.getCompletionPercentage(this.procedure());
  });

  constructor() {
    effect(() => {
        const proc = this.procedure();
        if(proc) {
            this.isSavedOffline.set(this.offlineService.isSaved(proc.id));
        }
    }, { allowSignalWrites: true });
  }

  toggleOfflineSave() {
    const proc = this.procedure();
    if (!proc) return;
    
    if (this.isSavedOffline()) {
      this.offlineService.removeProcedure(proc.id);
    } else {
      this.offlineService.saveProcedure(proc);
    }
    this.isSavedOffline.set(!this.isSavedOffline());
  }

  isStepCompleted(stepNumber: number): boolean {
    const procId = this.procedure()?.id;
    if (!procId) return false;
    return this.procedureStateService.isStepCompleted(procId, stepNumber);
  }

  toggleStep(stepNumber: number) {
    const procId = this.procedure()?.id;
    if (!procId) return;
    this.procedureStateService.toggleStepCompletion(procId, stepNumber);
  }
}
