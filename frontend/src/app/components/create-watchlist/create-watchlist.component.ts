import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-watchlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-9">
          <div class="card shadow-lg border-0">
            <div class="card-header bg-success text-white py-3">
              <h3 class="mb-0 fw-bold"><i class="bi bi-plus-circle me-2"></i>Crear Nueva Watchlist</h3>
            </div>
            <div class="card-body bg-dark text-light p-4">
              <form (ngSubmit)="onSubmit()" #paramForm="ngForm">
                
                <!-- Campo 1: Nombre -->
                <div class="mb-3">
                  <label class="form-label fw-bold">Nombre de la Lista <span class="text-danger">*</span></label>
                  <input type="text" class="form-control form-control-lg bg-secondary text-white border-0" 
                         [(ngModel)]="model.name" name="name" required placeholder="Ej: Maratón de Terror">
                </div>

                <!-- Campo 2: Descripción -->
                <div class="mb-3">
                  <label class="form-label fw-bold">Descripción <span class="text-danger">*</span></label>
                  <textarea class="form-control bg-secondary text-white border-0" 
                            [(ngModel)]="model.description" name="description" rows="3" required 
                            placeholder="¿De qué trata esta lista?"></textarea>
                </div>

                <div class="row g-3">
                   <!-- Campo 3: Visibilidad -->
                   <div class="col-md-6 mb-3">
                      <label class="form-label">Visibilidad</label>
                      <select class="form-select bg-secondary text-white border-0" [(ngModel)]="model.is_public" name="is_public">
                        <option [ngValue]="1">Pública (Todos pueden verla)</option>
                        <option [ngValue]="0">Privada (Solo yo)</option>
                      </select>
                   </div>
                   
                   <!-- Campo 4: Categoría -->
                   <div class="col-md-6 mb-3">
                      <label class="form-label">Categoría Principal</label>
                      <select class="form-select bg-secondary text-white border-0" [(ngModel)]="model.category" name="category">
                        <option value="General">General</option>
                        <option value="Accion">Acción / Aventura</option>
                        <option value="Drama">Drama / Llorar</option>
                        <option value="Comedia">Comedia</option>
                        <option value="Terror">Terror / Suspenso</option>
                        <option value="Oscar">Ganadoras del Oscar</option>
                      </select>
                   </div>
                </div>

                <div class="row g-3">
                   <!-- Campo 5: Prioridad -->
                   <div class="col-md-6 mb-3">
                      <label class="form-label">Prioridad de Visualización</label>
                       <select class="form-select bg-secondary text-white border-0" [(ngModel)]="model.priority" name="priority">
                        <option value="Alta">Alta (Ver YA)</option>
                        <option value="Media">Media (Fin de semana)</option>
                        <option value="Baja">Baja (Algún día)</option>
                      </select>
                   </div>

                   <!-- Campo 6: Fecha Meta -->
                   <div class="col-md-6 mb-3">
                      <label class="form-label">Fecha Meta (Opcional)</label>
                      <input type="date" class="form-control bg-secondary text-white border-0" 
                             [(ngModel)]="model.target_date" name="target_date">
                   </div>
                </div>

                <div class="d-grid gap-2 mt-4 d-md-flex justify-content-md-end">
                  <button type="button" class="btn btn-outline-light me-md-2" (click)="cancel()">Cancelar</button>
                  <button type="submit" class="btn btn-success px-5 fw-bold" [disabled]="!paramForm.form.valid">Crear Lista</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .form-control:focus, .form-select:focus {
        box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25);
        border-color: #28a745;
    }
  `]
})
export class CreateWatchlistComponent {
  model: any = {
    name: '',
    description: '',
    is_public: 1,
    category: 'General',
    priority: 'Media',
    target_date: ''
  };

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    const user = this.auth.getCurrentUser();
    if (!user) return;

    // Convert empty string to null for SQL DATE compatibility
    const payload = {
      ...this.model,
      user_id: user.id,
      target_date: this.model.target_date ? this.model.target_date : null
    };



    this.api.createWatchlist(payload).subscribe({
      next: (res) => {
        alert('Watchlist creada exitosamente!');
        this.router.navigate(['/watchlists']);
      },
      error: (err) => {
        console.error(err);
        alert('Error creando watchlist: ' + (err.error?.error || err.message));
      }
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
