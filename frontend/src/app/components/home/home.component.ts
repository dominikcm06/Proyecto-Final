import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Movie } from '../../models/movie';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    movies: Movie[] = [];
    featuredMovies: Movie[] = [];
    trendingMovies: Movie[] = [];
    newMovies: Movie[] = [];

    loading = true;
    errorMessage = '';

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.loadMovies();
    }

    loadMovies() {
        this.apiService.getMovies().subscribe({
            next: (data) => {
                this.movies = data;

                // Destacados: Filtrar títulos importantes específicos
                this.featuredMovies = this.movies.filter(m =>
                    m.title.includes('Interstellar') ||
                    m.title.includes('Matrix') ||
                    m.title.includes('Origen') ||
                    m.title.includes('Avatar')
                );
                // Respaldo si el filtro no encuentra nada
                if (this.featuredMovies.length === 0) {
                    this.featuredMovies = this.movies.slice(0, 3);
                }

                // Nuevas Películas: 2023 y 2024
                this.newMovies = this.movies.filter(m => m.release_year >= 2023);

                // Tendencias/Clásicos: Películas antiguas de alto perfil
                this.trendingMovies = this.movies.filter(m => m.release_year < 2023);

                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading movies:', error);
                this.errorMessage = 'No se pudieron cargar las películas. Revisa la conexión con el backend.';
                this.loading = false;
            }
        });
    }
}
