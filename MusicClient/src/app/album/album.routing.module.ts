import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { ListAlbumComponent } from './list-album/list-album.component';

const routes: Routes = [
  { path: 'albums/create', component: CreateAlbumComponent, },
  { path: 'albums/edit/:id', component: CreateAlbumComponent, },
  { path: 'albums/list', component: ListAlbumComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
