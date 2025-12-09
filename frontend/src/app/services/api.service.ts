import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }

    // Autenticación
    register(user: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    login(credentials: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, credentials);
    }

    // Usuarios
    getUser(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/users/${id}`);
    }

    getUserReviews(userId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/users/${userId}/reviews`);
    }

    // Películas
    getMovies(): Observable<any> {
        return this.http.get(`${this.apiUrl}/movies`);
    }

    getMovie(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/movies/${id}`);
    }

    // Reseñas
    getReviews(movieId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/reviews/${movieId}`);
    }

    addReview(review: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/reviews`, review);
    }

    // Watchlists (Listas de seguimiento)
    createWatchlist(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/watchlists`, data);
    }

    getUserWatchlists(userId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/watchlists?user_id=${userId}`);
    }

    addMovieToWatchlist(watchlistId: number, movieId: number): Observable<any> {
        return this.http.post(`${this.apiUrl}/watchlists/${watchlistId}/movies`, { movie_id: movieId });
    }

    getWatchlistById(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/watchlists/${id}`);
    }

    getMoviesInWatchlist(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/watchlists/${id}/movies`);
    }
}
