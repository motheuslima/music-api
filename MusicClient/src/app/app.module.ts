import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AlbumModule } from './album/album.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistModule } from './artist/artist.module';
import { GenreModule } from './genre/genre.module';

import { SharedModule } from './shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlbumModule,
    GenreModule,
    ArtistModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
