import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_URL, REQ_HEADER } from '../const';
import { Album } from '../models/album.model';

@Injectable()
export class AlbumService {
    endpoint = LOCAL_URL + 'Album/'

    constructor(private http: HttpClient) { }

    getAllAlbums() {
        return this.http.get<Array<Album>>(this.endpoint, { headers: REQ_HEADER });
    }

    getAlbum(id: number) {
        return this.http.get<Album>(this.endpoint + id, { headers: REQ_HEADER });
    }

    saveAlbum(album: Album) {
        if (album.id) {
            return this.http.put<Album>(this.endpoint, album, { headers: REQ_HEADER })
        }
        
        return this.http.post<Album>(this.endpoint, album, { headers: REQ_HEADER })
    }

    deleteAlbum(id: number) {
        return this.http.delete<Album>(this.endpoint + id, { headers: REQ_HEADER });
    }
}