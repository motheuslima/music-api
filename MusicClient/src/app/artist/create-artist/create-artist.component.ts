import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, of } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { Artist } from 'src/app/models/artist.model';
import { DiscographyAlbum } from 'src/app/models/discographyAlbum.model';
import { Music } from 'src/app/models/music.model';
import { ArtistService } from '../artist.service';


@Component({
  selector: 'app-create-artist',
  templateUrl: './create-artist.component.html',
  styleUrls: ['./create-artist.component.scss']
})
export class CreateArtistComponent implements OnInit {

  editMode: boolean = false;

  destroy$: Subject<boolean> = new Subject<boolean>();

  discography: Array<DiscographyAlbum> = [];

  artistForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    id: new FormControl("")
  });

  constructor(private artistService: ArtistService, 
    private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const editId = this.route.snapshot.queryParamMap.get('id');
    if (editId) {
      this.editMode = true;
      this.getArtist(+editId);
    }
  }

  getArtist(id: number) {
    this.artistService.getArtist(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (res: Artist) => {
        this.artistForm.controls.id.setValue(res.id!.toString()!);
        this.artistForm.controls.name.setValue(res.name);
        this.getArtistDiscography(res.id!);
        this.artistForm.updateValueAndValidity();
      },
      (err) => {
        window.alert(err.error);
        this.router.navigate(['artists/list']);
      }
    );
  }

  getArtistDiscography(id: number) {
    this.artistService.getArtistDiscography(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (res) => {
        this.discography = res;
      },
      (err) => {
        window.alert(err.error);
      }
    );
  }

  save() {
    if (this.artistForm.valid) {
      var {id, name} = this.artistForm.controls;
      var artist = new Artist(name.value!, +id.value!);
      this.artistService.saveArtist(artist)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: Artist) => {
          console.log(res);
          this.router.navigate(['artists/list']);
        },
        (err) => {
          window.alert(err.error);
          this.router.navigate(['artists/list']);
        }
      );
    } else {
      window.alert("Form invalid.")
    }
  }

  delete() {
    if(window.confirm('Are sure you want to delete this item ?')) {
      var {id} = this.artistForm.controls;

      this.artistService.deleteArtist(+id.value!)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: Artist) => {
          if (window.confirm("Artist deleted.")) {
            this.router.navigate(['artists/list']);
          }
        },
        (err) => {
          window.alert(err.error);
          this.router.navigate(['artists/list']);
        }
      );
    }
  }

}
