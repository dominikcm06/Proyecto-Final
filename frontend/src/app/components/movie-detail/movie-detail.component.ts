import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { Movie } from '../../models/movie';
import { Review } from '../../models/review';

@Component({
    selector: 'app-movie-detail',
    standalone: true,
    imports: [CommonModule, ReviewFormComponent, RouterLink],
    templateUrl: './movie-detail.component.html',
    styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
    movie!: Movie;
    reviews: Review[] = [];
    loading = true;
    errorMessage = '';

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        public auth: AuthService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadData(+id);
        } else {
            this.loading = false;
            this.errorMessage = 'ID de película no válido.';
        }
    }

    loadData(id: number) {
        this.api.getMovie(id).subscribe({
            next: (movie) => {
                this.movie = movie;
                this.loadReviews(id);
            },
            error: (err) => {
                console.error('Error fetching movie:', err);
                this.loading = false;
                this.errorMessage = 'No se pudo cargar la información de la película.';
            }
        });
    }

    loadReviews(movieId: number) {
        this.api.getReviews(movieId).subscribe({
            next: (reviews) => {
                this.reviews = reviews;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error fetching reviews:', err);
                this.loading = false;
                // Don't set errorMessage here, we still want to show the movie
            }
        });
    }

    onReviewAdded() {
        this.loadReviews(this.movie.id);
    }
}
