import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
    user: any;
    reviews: any[] = [];
    loading = true;
    errorMessage = '';

    constructor(private route: ActivatedRoute, public api: ApiService) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.loadData(+id);
            }
        });
    }

    loadData(id: number) {
        this.loading = true;
        this.errorMessage = '';

        // Timeout safety
        setTimeout(() => {
            if (this.loading) {
                this.loading = false;
                this.errorMessage = 'El servidor tardó demasiado en responder.';
            }
        }, 5000);

        this.api.getUser(id).subscribe({
            next: (u) => {
                this.user = u;
                this.api.getUserReviews(id).subscribe({
                    next: (r) => {
                        this.reviews = r;
                        this.loading = false;
                    },
                    error: (err) => {
                        console.error(err);
                        this.loading = false;
                    }
                });
            },
            error: (err) => {
                console.error(err);
                this.loading = false;
                this.errorMessage = 'No se pudo cargar el perfil del usuario.';
            }
        });
    }
}
