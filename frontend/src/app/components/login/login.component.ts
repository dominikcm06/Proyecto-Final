import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    credentials = { email: '', password: '' };
    error = '';

    constructor(
        private api: ApiService,
        private auth: AuthService,
        private router: Router
    ) { }

    login() {
        this.api.login(this.credentials).subscribe({
            next: (res) => {
                this.auth.login(res.user);
                this.router.navigate(['/']);
            },
            error: (err) => {
                this.error = 'Correo o contraseña inválidos';
            }
        });
    }
}
