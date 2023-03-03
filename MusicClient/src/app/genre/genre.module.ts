import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGenreComponent } from './create-genre/create-genre.component';
import { GenreRoutingModule } from './genre.routing.module';
import { SharedModule } from '../shared.module';
import { ListGenreComponent } from './list-genre/list-genre.component';
import { GenreService } from './genre.service';


@NgModule({
  declarations: [
    CreateGenreComponent,
    ListGenreComponent
  ],
  imports: [
    CommonModule,
    GenreRoutingModule,
    SharedModule
  ],
  providers: [GenreService]
})
export class GenreModule { }
