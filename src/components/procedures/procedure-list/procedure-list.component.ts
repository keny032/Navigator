
import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProcedureService } from '../../../services/procedure.service';
import { Category, Procedure } from '../../../models/procedure.model';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-procedure-list',
  templateUrl: './procedure-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, LoaderComponent],
})
export class ProcedureListComponent {
  procedureService = inject(ProcedureService);

  procedures = this.procedureService.getProcedures();
  categories = this.procedureService.getCategories();
  
  selectedCategory = signal<Category | 'all'>('all');
  
  filteredProcedures = computed(() => {
    const procs = this.procedures();
    const cat = this.selectedCategory();
    
    if (cat === 'all') {
      return procs;
    }
    return procs.filter(p => p.category === cat);
  });
  
  selectCategory(category: Category | 'all') {
    this.selectedCategory.set(category);
  }
}
