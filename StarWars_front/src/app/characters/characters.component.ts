import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { RouterModule } from '@angular/router';
import { Character } from '../character';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
  providers: [HttpClient, CharacterService]
})
export class CharactersComponent {
  characters: Character[] = [];
  currentPage = 1;
  private dataSubscription!: Subscription;
  private currentSearch: string = '';

  constructor(private characterService: CharacterService, private dataService: DataService) { }

  ngOnInit(): void {
    this.loadCharacters('')
    this.dataSubscription = this.dataService.getData().subscribe(data => {
      this.currentSearch = data;
      this.characters = [];
      this.currentPage = 1;
      this.loadCharacters(this.currentSearch);
    });
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  loadCharacters(text: string) {
    this.characterService.getCharacters(this.currentPage, text).subscribe(
      (data: any) => {
        this.characters = [...this.characters, ...data.results];
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
      this.loadCharacters(this.currentSearch);
    }
  }
}
