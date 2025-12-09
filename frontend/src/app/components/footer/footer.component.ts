import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-dark text-center text-white py-3 mt-5">
      <div class="container">
        <p>&copy; 2025 CineSocial. Todos los Derechos Reservados.</p>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent { }
