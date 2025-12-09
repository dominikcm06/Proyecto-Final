import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CreateWatchlistComponent } from './components/create-watchlist/create-watchlist.component';
import { MyWatchlistsComponent } from './components/my-watchlists/my-watchlists.component';
import { WatchlistDetailComponent } from './components/watchlist-detail/watchlist-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'movies/:id', component: MovieDetailComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'profile/:id', component: UserProfileComponent },
    { path: 'watchlists', component: MyWatchlistsComponent },
    { path: 'watchlists/new', component: CreateWatchlistComponent },
    { path: 'watchlists/:id', component: WatchlistDetailComponent },
    { path: '**', redirectTo: '' }
];
