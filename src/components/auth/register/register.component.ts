
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterModule],
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  email = signal('');
  password = signal('');
  isLoading = signal(false);
  error = signal('');

  async register() {
    this.isLoading.set(true);
    this.error.set('');
    try {
      const success = await this.authService.register(this.email(), this.password());
      if (success) {
        this.router.navigate(['/home']);
      } else {
        this.error.set('Registracija nije uspjela. Pokušajte ponovo.');
      }
    } catch (e) {
      this.error.set('Došlo je do greške. Pokušajte ponovo.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
