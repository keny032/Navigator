
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OfflineService } from '../../services/offline.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
})
export class HomeComponent {
    offlineService = inject(OfflineService);
    offlineCount = this.offlineService.offlineProcedures().length;
}
