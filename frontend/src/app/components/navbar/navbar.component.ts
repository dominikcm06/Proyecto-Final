import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
    user$!: Observable<any>;

    constructor(public authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.user$ = this.authService.user$;
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
