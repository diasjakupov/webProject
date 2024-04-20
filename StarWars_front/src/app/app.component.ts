import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, ViewportScroller } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginService } from "./login.service";
import { LoginComponent } from "./login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CatalogComponent, HttpClientModule, CommonModule, RouterModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StarWars';
  isLoggedIn: boolean = true ;

  constructor(private viewportScroller: ViewportScroller, private loginService: LoginService) { }

  /*ngOnInit() {
    this.isLoggedIn = this.loginService.isLoggedIn();
  }*/

  scrollDown(): void {
    this.viewportScroller.scrollToAnchor('result');
  }

  logout() {
    this.loginService.logout()
  }
}
