import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAlbumComponent } from './list-album/list-album.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { AlbumService } from './album.service';
import { MusicService } from './music.service';
import { AlbumRoutingModule } from './album.routing.module';
import { SharedModule } from '../shared.module';
import { ArtistModule } from '../artist/artist.module';
import { GenreModule } from '../genre/genre.module';
import { CreateMusicComponent } from './create-music/create-music.component';


@NgModule({
  declarations: [
    ListAlbumComponent,
    CreateAlbumComponent,
    CreateMusicComponent
  ],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    SharedModule,
    ArtistModule,
    GenreModule
  ],
  providers: [AlbumService, MusicService]
})
export class AlbumModule { }
