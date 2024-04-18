import { Component } from '@angular/core';
import { CatalogComponent } from '../catalog/catalog.component';
import { RouterModule } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CatalogComponent, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  constructor(private viewportScroller: ViewportScroller) {}

  scrollDown(): void {
    this.viewportScroller.scrollToAnchor('result');
  }
}
