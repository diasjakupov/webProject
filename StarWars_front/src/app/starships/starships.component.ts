import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { StarshipService } from '../starship/starship.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Starship } from '../starship/starship';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.css',
  providers: [HttpClient, StarshipService]
})
export class StarshipsComponent implements OnInit {
  starships: Starship[] = [];
  currentPage = 1;
  private dataSubscription!: Subscription;
  private currentSearch: string = '';

  constructor(private starshipService: StarshipService, private dataService: DataService){ }

  ngOnInit(): void {
    this.loadStarships('')
    this.dataSubscription = this.dataService.getData().subscribe(data => {
      this.currentSearch = data;
      this.starships = [];
      this.currentPage = 1;
      this.loadStarships(this.currentSearch);
    })
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  loadStarships(text: string) {
    this.starshipService.getStarships(this.currentPage, text).subscribe((data: any) => {
      this.starships = [...this.starships, ...data.results];
    })
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);

    if (windowHeight + scrollPosition >= documentHeight) {
      this.currentPage++;
      this.loadStarships(this.currentSearch);
    }
  }

}
