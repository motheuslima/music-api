import {AfterViewInit, Component, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import { Subject, takeUntil, of } from 'rxjs';
import { Genre } from 'src/app/models/genre.model';
import { GenreService } from '../genre.service';

@Component({
  selector: 'app-list-genre',
  templateUrl: './list-genre.component.html',
  styleUrls: ['./list-genre.component.scss']
})
export class ListGenreComponent implements OnDestroy {
  displayedColumns: string[] = ['id', 'name'];
  dataSource: MatTableDataSource<Genre>;

  @ViewChild(MatSort) sort: MatSort;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private genreService: GenreService, private router: Router) {
    this.loadGenres();
  }

  loadGenres() {
    this.genreService.getAllGenres()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      (err) => {
        window.alert(err.error);
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editGenre(genre: any) {
    this.router.navigate(['genres/create'], {
      queryParams: {
        id: genre.id, 
      },
    });
  }
}
