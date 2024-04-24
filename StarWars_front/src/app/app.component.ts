import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CatalogComponent } from './view/startwars/catalog/catalog.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, ViewportScroller } from '@angular/common';
import { HomeComponent } from './view/startwars/home/home.component';
import { LoginComponent } from "./view/forum/login/login.component";
import { AuthAPIServiceService } from './data/network/auth/service/auth-apiservice.service';

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

  constructor(private viewportScroller: ViewportScroller, private auth: AuthAPIServiceService) { }

  ngOnInit() {
    this.auth.isLoggedIn.subscribe((data)=>{
      this.isLoggedIn = data
    })
  }

  scrollDown(): void {
    this.viewportScroller.scrollToAnchor('result');
  }

  logout() {
    this.auth.logout()
  }
}
