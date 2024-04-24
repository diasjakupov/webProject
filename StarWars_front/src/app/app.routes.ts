import { Routes } from '@angular/router';
import { PlanetComponent } from './view/startwars/planet/planet.component';
import { PlanetdetailComponent } from './view/startwars/planetdetail/planetdetail.component';
import { HomeComponent } from './view/startwars/home/home.component';
import { CharactersComponent } from './view/startwars/characters/characters.component';
import { CharacterdetailComponent } from './view/startwars/characterdetail/characterdetail.component';
import { LoginComponent } from "./view/forum/login/login.component";
import { PostComponent } from "./view/forum/post/post.component";
import { CommentComponent } from "./view/forum/comment/comment.component";
import { ComentateComponent } from "./view/forum/comentate/comentate.component";
import { StarshipsComponent } from './view/startwars/starships/starships.component';
import { StarshipdetailComponent } from './view/startwars/starshipdetail/starshipdetail.component';
import { RegisterComponent } from './view/forum/registration/registration.component';
import { ForumComponent } from './view/forum/forum/forum.component';
import { BottomPostsComponent } from './view/forum/bottom-posts/bottom-posts.component';


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
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'post', component: PostComponent },
  { path: 'bottom-posts', component: BottomPostsComponent },
  { path: 'comment/:id', component: CommentComponent },
  { path: 'comentate/:id', component: ComentateComponent },
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
