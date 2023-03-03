import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGenreComponent } from './create-genre/create-genre.component';
import { ListGenreComponent } from './list-genre/list-genre.component';

const routes: Routes = [
  { path: 'genres/create', component: CreateGenreComponent, },
  { path: 'genres/edit/:id', component: CreateGenreComponent, },
  { path: 'genres/list', component: ListGenreComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GenreRoutingModule { }
