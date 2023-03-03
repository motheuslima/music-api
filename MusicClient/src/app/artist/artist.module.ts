import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArtistComponent } from './create-artist/create-artist.component';
import { ListArtistComponent } from './list-artist/list-artist.component';
import { SharedModule } from '../shared.module';
import { ArtistRoutingModule } from './artist.routing.module';
import { ArtistService } from './artist.service';

@NgModule({
  declarations: [
    CreateArtistComponent,
    ListArtistComponent
  ],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    SharedModule
  ],
  providers: [ArtistService]
})
export class ArtistModule { }
