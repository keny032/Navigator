
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OfflineService } from '../../../services/offline.service';

@Component({
  selector: 'app-offline-list',
  templateUrl: './offline-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
})
export class OfflineListComponent {
  offlineService = inject(OfflineService);
  offlineProcedures = this.offlineService.getOfflineProcedures();
}
