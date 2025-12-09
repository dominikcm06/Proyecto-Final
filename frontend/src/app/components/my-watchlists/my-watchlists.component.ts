import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-my-watchlists',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="container mt-5">
      <!-- Banner para agregar película -->
      <div *ngIf="pendingMovieId" class="alert alert-warning d-flex justify-content-between align-items-center mb-4 shadow-sm">
          <div>
              <i class="bi bi-exclamation-circle-fill me-2"></i>
              <strong>Selecciona una lista</strong> para agregar la película seleccionada.
          </div>
          <button class="btn btn-outline-dark btn-sm" (click)="cancelAdd()">Cancelar</button>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-4">
          <h2><i class="bi bi-collection-play me-2"></i> Mis Watchlists</h2>
          <a routerLink="/watchlists/new" class="btn btn-primary"><i class="bi bi-plus-lg"></i> Nueva Lista</a>
      </div>

      <div *ngIf="loading" class="text-center">
          <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Cargando...</span></div>
      </div>

      <div *ngIf="!loading && watchlists.length === 0" class="alert alert-info">
          No tienes ninguna watchlist creada. ¡Crea la primera ahora!
      </div>

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" *ngIf="!loading">
          <div class="col" *ngFor="let list of watchlists">
              <!-- Tarjeta: Estructura por defecto -->
              <div class="card h-100 shadow-sm" [class.border-warning]="pendingMovieId" [class.border-2]="pendingMovieId">
                  <div class="card-body">
                      <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="card-title text-primary fw-bold text-truncate">{{ list.name }}</h5>
                        <span class="badge" [ngClass]="list.is_public ? 'bg-success' : 'bg-secondary'">
                            {{ list.is_public ? 'Pública' : 'Privada' }}
                        </span>
                      </div>
                      <!-- Changed to text-white for maximum visibility -->
                      <div class="mb-2">
                          <span class="badge me-1 bg-secondary">{{ list.category }}</span>
                          <span class="badge" [ngClass]="getPriorityBadge(list.priority)">{{ list.priority }}</span>
                      </div>
                      
                      <!-- Changed to text-white for maximum visibility -->
                      <p class="card-text text-truncate text-white">{{ list.description }}</p>
                      
                      <div class="mt-3 d-grid gap-2">
                          <!-- Cambiado a texto blanco para máxima visibilidad -->
                          <small class="text-white d-block text-center mb-1" *ngIf="list.target_date">Meta: {{ list.target_date | date }}</small>
                          
                          <!-- Botón Agregar (Visible solo al agregar película) -->
                          <button *ngIf="pendingMovieId" class="btn btn-warning fw-bold" (click)="addToWatchlist(list.id)">
                              <i class="bi bi-plus-square-fill me-2"></i> AGREGAR AQUÍ
                          </button>

                          <button *ngIf="!pendingMovieId" class="btn btn-outline-light btn-sm" [routerLink]="['/watchlists', list.id]">
                              Ver Contenido
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  `
})
export class MyWatchlistsComponent implements OnInit {
    watchlists: any[] = [];
    loading = true;
    pendingMovieId: number | null = null;

    constructor(
        private api: ApiService,
        private auth: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        // Verificar si hay película para agregar
        this.route.queryParams.subscribe(params => {
            if (params['add_movie']) {
                this.pendingMovieId = +params['add_movie']; // Convert to number
            }
        });

        const user = this.auth.getCurrentUser();
        if (user) {
            this.api.getUserWatchlists(user.id).subscribe({
                next: (data) => {
                    this.watchlists = data;
                    this.loading = false;
                },
                error: (err) => this.loading = false
            });
        }
    }

    addToWatchlist(watchlistId: number) {
        if (!this.pendingMovieId) return;

        this.api.addMovieToWatchlist(watchlistId, this.pendingMovieId).subscribe({
            next: () => {
                alert('¡Película agregada correctamente!');
                this.pendingMovieId = null;
                // Limpiar URL
                this.router.navigate([], {
                    queryParams: {
                        'add_movie': null,
                    },
                    queryParamsHandling: 'merge'
                });
            },
            error: (err) => {
                console.error(err);
                alert('Error al agregar: ' + (err.error?.error || err.message));
            }
        });
    }

    getPriorityBadge(priority: string): string {
        switch (priority) {
            case 'Alta': return 'bg-danger text-white';
            case 'Media': return 'bg-warning text-dark';
            case 'Baja': return 'bg-info text-dark';
            default: return 'bg-secondary text-white';
        }
    }

    cancelAdd() {
        this.pendingMovieId = null;
        this.router.navigate([], {
            queryParams: {
                'add_movie': null,
            },
            queryParamsHandling: 'merge'
        });
    }
}
