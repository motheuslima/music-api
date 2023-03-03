import {Component, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import { Subject, takeUntil, of } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-list-album',
  templateUrl: './list-album.component.html',
  styleUrls: ['./list-album.component.scss']
})
export class ListAlbumComponent {
  displayedColumns: string[] = ['id', 'name', 'artist', 'genre'];
  dataSource: MatTableDataSource<Album>;

  @ViewChild(MatSort) sort: MatSort;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private albumService: AlbumService, private router: Router) {
    this.loadAlbums();
  }

  loadAlbums() {
    this.albumService.getAllAlbums()
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

  editAlbum(album: any) {
    this.router.navigate(['albums/create'], {
      queryParams: {
        id: album.id, 
      },
    });
  }
}
