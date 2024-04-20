import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Planet } from '../planets/planets';
import { PlanetsService } from '../planets/planets.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-planet',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './planet.component.html',
  styleUrl: './planet.component.css',
  providers: [HttpClient, PlanetsService]
})
export class PlanetComponent implements OnInit {
  planets: Planet[] = [];
  currentPage = 1;
  private dataSubscription!: Subscription;
  private currentSearch: string = '';

  constructor(private planetService: PlanetsService, private dataService: DataService) { }

  ngOnInit(): void {
    this.loadPlanets('')
    this.dataSubscription = this.dataService.getData().subscribe(data => {
      this.currentSearch = data;
      this.planets = [];
      this.currentPage = 1;
      this.loadPlanets(this.currentSearch);
    });
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  loadPlanets(text: string) {
    this.planetService.getPlanets(this.currentPage, text).subscribe(
      (data: any) => {
        this.planets = [...this.planets, ...data.results];
      }
    );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);

    if (windowHeight + scrollPosition >= documentHeight) {
      this.currentPage++;
      this.loadPlanets(this.currentSearch);
    }
  }

}
