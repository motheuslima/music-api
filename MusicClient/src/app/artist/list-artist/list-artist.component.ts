import {AfterViewInit, Component, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import { Subject, takeUntil, of } from 'rxjs';
import { Artist } from 'src/app/models/artist.model';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-list-artist',
  templateUrl: './list-artist.component.html',
  styleUrls: ['./list-artist.component.scss']
})
export class ListArtistComponent {
  displayedColumns: string[] = ['id', 'name'];
  dataSource: MatTableDataSource<Artist>;

  @ViewChild(MatSort) sort: MatSort;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private artistService: ArtistService, private router: Router) {
    this.loadArtists();
  }

  loadArtists() {
    this.artistService.getAllArtists()
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

  editArtist(artist: any) {
    this.router.navigate(['artists/create'], {
      queryParams: {
        id: artist.id, 
      },
    });
  }
}
