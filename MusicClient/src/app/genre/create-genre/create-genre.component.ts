import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, of } from 'rxjs';
import { Genre } from 'src/app/models/genre.model';
import { GenreService } from '../genre.service';


@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.scss']
})
export class CreateGenreComponent implements OnInit {

  editMode: boolean = false;

  destroy$: Subject<boolean> = new Subject<boolean>();

  genreForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    id: new FormControl("")
  });

  constructor(private genreService: GenreService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const editId = this.route.snapshot.queryParamMap.get('id');
    if (editId) {
      this.editMode = true;
      this.getGenre(+editId);
    }
  }

  getGenre(id: number) {
    this.genreService.getGenre(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (res: Genre) => {
        this.genreForm.controls.id.setValue(res.id?.toString()!);
        this.genreForm.controls.name.setValue(res.name);
        this.genreForm.updateValueAndValidity();
      },
      (err) => {
        window.alert(err.error);
        this.router.navigate(['genres/list']);
      }
    );
  }

  save() {
    if (this.genreForm.valid) {
      var {id, name} = this.genreForm.controls;
      var genre = new Genre(name.value!, +id.value!);
      this.genreService.saveGenre(genre)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: Genre) => {
          console.log(res);
          this.router.navigate(['genres/list']);
        },
        (err) => {
          window.alert(err.error);
          this.router.navigate(['genres/list']);
        }
      );
    } else {
      window.alert("Form invalid.")
    }
  }

  delete() {
    if(window.confirm('Are sure you want to delete this item ?')) {
      var {id} = this.genreForm.controls;

      this.genreService.deleteGenre(+id.value!)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: Genre) => {
          if (window.confirm("Genre deleted.")) {
            this.router.navigate(['genres/list']);
          }
        },
        (err) => {
          window.alert(err.error);
          this.router.navigate(['genres/list']);
        }
      );
    }
  }

}
