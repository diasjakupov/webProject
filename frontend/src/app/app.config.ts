import { ApplicationConfig, Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatButton} from "@angular/material/button";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButton, /* другие модули */],
  templateUrl: './pages/home/home.component.html',
  styleUrls: ['./pages/home/home.component.css']
})
export class HomeComponent {
  // Логика компонента...
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync()]
};
