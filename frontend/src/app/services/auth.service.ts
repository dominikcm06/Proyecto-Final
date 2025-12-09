import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userSubject = new BehaviorSubject<any>(null);
    user$ = this.userSubject.asObservable();

    constructor() {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            this.userSubject.next(JSON.parse(storedUser));
        }
    }

    login(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null);
    }

    getCurrentUser() {
        return this.userSubject.value;
    }

    isAuthenticated(): boolean {
        return !!this.userSubject.value;
    }
}
