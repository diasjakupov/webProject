import { Routes } from '@angular/router';
import { PlanetComponent } from './planet/planet.component';
import { StarshipsComponent } from './starships/starships.component';
import { PlanetdetailComponent } from './planetdetail/planetdetail.component';
import { HomeComponent } from './home/home.component';
import { StarshipdetailComponent } from './starshipdetail/starshipdetail.component';
import { CharactersComponent } from './characters/characters.component';
import { CharacterdetailComponent } from './characterdetail/characterdetail.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: PlanetComponent,
                title: 'Planets'
            },
            {
                path: 'starships',
                component: StarshipsComponent,
                title: 'Starships'
            },
            {
                path: 'characters',
                component: CharactersComponent,
                title: 'Characters'
            }
        ]
    },
    {
        path: 'planet/:name',
        component: PlanetdetailComponent,
        title: 'Planet'
    },
    {
        path: 'starship/:name',
        component: StarshipdetailComponent,
        title: 'Starship'
    },
    {
        path: 'character/:name',
        component: CharacterdetailComponent,
        title: 'Character'
    }
];
