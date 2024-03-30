import { ApplicationConfig, Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule /* другие модули */],
  templateUrl: './pages/home/home.component.html',
  styleUrls: ['./pages/home/home.component.css']
})
export class HomeComponent {
  // Логика компонента...
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
