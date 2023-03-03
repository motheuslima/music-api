import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup, FormArray, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, of } from 'rxjs';
import { ArtistService } from 'src/app/artist/artist.service';
import { GenreService } from 'src/app/genre/genre.service';
import { Album } from 'src/app/models/album.model';
import { Artist } from 'src/app/models/artist.model';
import { DiscographyAlbum } from 'src/app/models/discographyAlbum.model';
import { Genre } from 'src/app/models/genre.model';
import { Music } from 'src/app/models/music.model';
import { AlbumService } from '../album.service';
import { MusicService } from '../music.service';


@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss']
})
export class CreateAlbumComponent implements OnInit {

  editMode: boolean = false;

  destroy$: Subject<boolean> = new Subject<boolean>();

  discography: Array<DiscographyAlbum> = [];

  genres: Array<Genre> = [];

  artists: Array<Artist> = [];

  selectedArtist: Artist;

  selectedGenre: Genre;

  musics: Array<Music> = [];

  albumForm = this.fb.group({
    name: this.fb.control("", [Validators.required]),
    id: this.fb.control(""),
    artist: this.fb.control({}, [Validators.required]),
    genre: this.fb.control({}, [Validators.required]),
    musics: this.fb.array([
      this.fb.control('', [Validators.required]) || this.fb.group({})
    ], [Validators.required])
  });

  getMusics(): FormArray {
    return this.albumForm.get('musics') as FormArray;
  }

  onAddMusic() {
    this.getMusics().push(this.fb.control('', [Validators.required]));
  }

  removeMusic(index: any) {
    this.getMusics().removeAt(index);
  }

  constructor(private albumService: AlbumService,
    private artistService: ArtistService,
    private genreService: GenreService, 
    private musicService: MusicService,
    private fb: FormBuilder,
    private route: ActivatedRoute, private router: Router) {
      this.getGenres();
      this.getArtists();
    }

  ngOnInit() {
    const editId = this.route.snapshot.queryParamMap.get('id');
    if (editId) {
      this.editMode = true;
      this.getAlbum(+editId);
    }
  }

  getGenres() {
    this.genreService.getAllGenres()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (res) => {
        this.genres = res;
      },
      (err) => {
        window.alert(err.error);
      }
    );
  }

  getArtists() {
    this.artistService.getAllArtists()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (res) => {
        this.artists = res;
      },
      (err) => {
        window.alert(err.error);
      }
    );
  }

  getAlbum(id: number) {
    this.albumService.getAlbum(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (res: Album) => {
        this.albumForm.controls.id.setValue(res.id!.toString()!);
        this.albumForm.controls.name.setValue(res.name);

        this.albumForm.controls.artist.setValue(res.artist);
        this.selectedArtist = this.artists.find(a => a.id == res.artist.id)!;

        this.albumForm.controls.genre.setValue(res.genre);
        this.selectedGenre = this.genres.find(g => g.id == res.genre.id)!;
        
        this.albumForm.updateValueAndValidity();

        this.getAlbumMusics(res.id!);
      },
      (err) => {
        window.alert(err.error);
        this.router.navigate(['albums/list']);
      }
    );
  }

  getAlbumMusics(id: number) {
    this.musicService.getMusicsFromAlbum(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (res: Array<Music>) => {
        this.albumForm.controls.musics.clear();

        res.forEach(music => {
          this.albumForm.controls.musics.push(
            this.fb.group({
              id: music.id.toString(),
              name: music.name
            })
          )
        })

        this.albumForm.updateValueAndValidity();

        this.musics = res;
      },
      (err) => {
        window.alert(err.error);
        this.router.navigate(['artists/list']);
      }
    );
  }

  save() {
    if (this.albumForm.valid) {
      var {id, name, artist, genre, musics } = this.albumForm.controls;
      var album = new Album(
        name.value!, 
        (genre.value as Genre).id!, 
        (artist.value as Artist).id!, 
        (musics.value as Music[]), 
        +id.value!, 
      );

      this.albumService.saveAlbum(album)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: Album) => {
          console.log(res);
          this.router.navigate(['albums/list']);
        },
        (err) => {
          window.alert(err.error);
          this.router.navigate(['albums/list']);
        }
      );
    } else {
      window.alert("Form invalid.")
    }
  }

  delete() {
    if(window.confirm('Are sure you want to delete this item ?')) {
      var {id} = this.albumForm.controls;

      this.albumService.deleteAlbum(+id.value!)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: Album) => {
          if (window.confirm("Album deleted.")) {
            this.router.navigate(['albums/list']);
          }
        },
        (err) => {
          window.alert(err.error);
          this.router.navigate(['albums/list']);
        }
      );
    }
  }

}
