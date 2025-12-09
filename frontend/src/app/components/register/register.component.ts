import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    user = { first_name: '', last_name: '', username: '', email: '', password: '', bio: '' };
    error = '';

    constructor(private api: ApiService, private router: Router) { }

    register() {
        this.api.register(this.user).subscribe({
            next: (res) => {
                alert('¡Registro exitoso! Por favor inicia sesión.');
                this.router.navigate(['/login']);
            },
            error: (err) => {
                this.error = 'El registro falló. Inténtalo de nuevo.';
            }
        });
    }
}
