
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { LocalizationService } from '../../../services/localization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, CommonModule],
})
export class HeaderComponent {
  authService = inject(AuthService);
  localizationService = inject(LocalizationService);
  isMenuOpen = signal(false);

  logout() {
    this.authService.logout();
  }
  
  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
