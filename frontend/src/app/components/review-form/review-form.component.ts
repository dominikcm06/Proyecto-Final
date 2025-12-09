import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card bg-secondary bg-opacity-10 border-0 p-3">
      <h4 class="text-white">Escribe una Reseña</h4>
      <form (ngSubmit)="submitReview()">
        
        <!-- Field 1: Title -->
        <div class="mb-3">
          <label class="form-label text-white">Título de tu reseña</label>
          <input type="text" class="form-control" [(ngModel)]="title" name="title" required>
        </div>

        <!-- Field 2: Rating -->
        <div class="mb-3">
          <label class="form-label text-white">Calificación</label>
          <select class="form-select" [(ngModel)]="rating" name="rating" required>
            <option [ngValue]="5">5 - Excelente</option>
            <option [ngValue]="4">4 - Buena</option>
            <option [ngValue]="3">3 - Regular</option>
            <option [ngValue]="2">2 - Mala</option>
            <option [ngValue]="1">1 - Terrible</option>
          </select>
        </div>

        <!-- Field 3: Visibility -->
        <div class="mb-3">
            <label class="form-label text-white">Visibilidad</label>
            <select class="form-select" [(ngModel)]="is_public" name="is_public">
                <option [ngValue]="true">Pública</option>
                <option [ngValue]="false">Privada</option>
            </select>
        </div>

        <!-- Field 4: Comment -->
        <div class="mb-3">
          <label class="form-label text-white">Comentario</label>
          <textarea class="form-control" [(ngModel)]="comment" name="comment" rows="3" required></textarea>
        </div>

        <!-- Fields 5 & 6: Compacted inline -->
        <div class="row mb-3">
            <div class="col-6">
                <label class="form-label text-white">¿Contiene Spoilers?</label>
                <select class="form-select" [(ngModel)]="contains_spoilers" name="contains_spoilers">
                    <option [ngValue]="false">No</option>
                    <option [ngValue]="true">Sí</option>
                </select>
            </div>
            <div class="col-6">
                <label class="form-label text-white">¿La recomiendas?</label>
                <select class="form-select" [(ngModel)]="would_recommend" name="would_recommend">
                    <option [ngValue]="true">Sí</option>
                    <option [ngValue]="false">No</option>
                </select>
            </div>
        </div>

        <button type="submit" class="btn btn-danger" [disabled]="!comment || !title">Enviar Reseña</button>
      </form>
    </div>
  `
})
export class ReviewFormComponent {
  @Input() movieId!: number;
  @Output() reviewAdded = new EventEmitter<void>();

  title = '';
  rating = 5;
  comment = '';
  is_public = true;
  contains_spoilers = false;
  would_recommend = true;

  constructor(private api: ApiService, private auth: AuthService) { }

  submitReview() {
    const user = this.auth.getCurrentUser();
    if (!user) return;

    const review = {
      user_id: user.id,
      movie_id: this.movieId,
      title: this.title,
      rating: this.rating,
      comment: this.comment,
      is_public: this.is_public,
      contains_spoilers: this.contains_spoilers,
      would_recommend: this.would_recommend
    };

    this.api.addReview(review).subscribe({
      next: () => {
        this.title = '';
        this.comment = '';
        this.rating = 5;
        this.is_public = true;
        this.contains_spoilers = false;
        this.would_recommend = true;
        this.reviewAdded.emit();
      },
      error: (err) => alert('Fallo al publicar la reseña')
    });
  }
}
