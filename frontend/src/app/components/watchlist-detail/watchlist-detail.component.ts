import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-watchlist-detail',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="container mt-5 pb-5">
      <!-- Loading -->
      <div *ngIf="loading" class="text-center mt-5">
        <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Cargando...</span></div>
      </div>

      <div *ngIf="!loading && watchlist">
        <!-- Header -->
        <div class="mb-5">
            <a routerLink="/watchlists" class="btn btn-outline-light mb-3"><i class="bi bi-arrow-left"></i> Volver a mis listas</a>
            
            <div class="card bg-dark text-light border-secondary shadow-lg">
                <div class="card-body p-4">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <span class="badge mb-2" [ngClass]="watchlist.is_public ? 'bg-success' : 'bg-secondary'">
                                {{ watchlist.is_public ? 'Pública' : 'Privada' }}
                            </span>
                            <h1 class="display-5 fw-bold text-primary">{{ watchlist.name }}</h1>
                            <p class="lead">{{ watchlist.description }}</p>
                            <!-- Visibility Fix: text-muted -> text-white-50 -->
                            <div class="d-flex gap-3 text-white-50">
                                <span><i class="bi bi-tag-fill me-1"></i> {{ watchlist.category }}</span>
                                <span class="badge" [ngClass]="getPriorityBadge(watchlist.priority)">{{ watchlist.priority }}</span>
                                <span *ngIf="watchlist.target_date"><i class="bi bi-calendar-event me-1"></i> {{ watchlist.target_date | date }}</span>
                            </div>
                        </div>
                        <div class="text-end">
                            <h3 class="display-4 fw-bold">{{ movies.length }}</h3>
                            <!-- Visibility Fix: text-muted -> text-white-50 -->
                            <small class="text-white-50 text-uppercase">Películas</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="movies.length === 0" class="text-center py-5">
            <!-- Visibility Fix: text-secondary -> text-white-50 -->
            <i class="bi bi-film display-1 text-white-50 mb-3"></i>
            <h3>Esta lista está vacía</h3>
            <!-- Visibility Fix: text-muted -> text-light -->
            <p class="text-light">Agrega películas desde la página de inicio.</p>
            <a routerLink="/" class="btn btn-primary mt-3">Ir a Inicio</a>
        </div>

        <!-- Movies Grid -->
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
            <div class="col" *ngFor="let movie of movies">
                <div class="card h-100 movie-card shadow-sm" [routerLink]="['/movies', movie.id]">
                    <div class="position-relative">
                        <img [src]="movie.image_url" class="card-img-top" [alt]="movie.title" referrerpolicy="no-referrer">
                        <div class="card-img-overlay d-flex align-items-end p-0">
                            <div class="w-100 p-2 bg-gradient-dark text-white">
                                <h6 class="card-title text-truncate m-0">{{ movie.title }}</h6>
                                <small>{{ movie.release_year }}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .movie-card {
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        border: none;
        background: #1a1a1a;
    }
    .movie-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    }
    .bg-gradient-dark {
        background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0));
    }
  `]
})
export class WatchlistDetailComponent implements OnInit {
    watchlist: any;
    movies: any[] = [];
    loading = true;

    getPriorityBadge(priority: string): string {
        switch (priority) {
            case 'Alta': return 'bg-danger text-white';
            case 'Media': return 'bg-warning text-dark';
            case 'Baja': return 'bg-info text-dark';
            default: return 'bg-secondary text-white';
        }
    }

    constructor(
        private route: ActivatedRoute,
        private api: ApiService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadData(+id);
        }
    }

    loadData(id: number) {
        // Load details and movies in parallel
        // For simplicity, nested subscriptions
        this.api.getWatchlistById(id).subscribe({
            next: (data) => {
                this.watchlist = data;
                this.api.getMoviesInWatchlist(id).subscribe({
                    next: (movies) => {
                        this.movies = movies;
                        this.loading = false;
                    }
                });
            },
            error: (err) => {
                console.error(err);
                this.loading = false;
            }
        });
    }
}
