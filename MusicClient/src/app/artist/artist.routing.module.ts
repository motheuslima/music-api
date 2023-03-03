import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArtistComponent } from './create-artist/create-artist.component';
import { ListArtistComponent } from './list-artist/list-artist.component';

const routes: Routes = [
  { path: 'artists/create', component: CreateArtistComponent, },
  { path: 'artists/edit/:id', component: CreateArtistComponent, },
  { path: 'artists/list', component: ListArtistComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ArtistRoutingModule { }
