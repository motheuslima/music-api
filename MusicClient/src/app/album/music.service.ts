import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_URL, REQ_HEADER } from '../const';
import { Music } from '../models/music.model';

@Injectable()
export class MusicService {
    endpoint = LOCAL_URL + 'Music/'

    constructor(private http: HttpClient) { }

    getAllMusics() {
        return this.http.get<Array<Music>>(this.endpoint, { headers: REQ_HEADER });
    }

    getMusic(id: number) {
        return this.http.get<Music>(this.endpoint + id, { headers: REQ_HEADER });
    }

    saveMusic(music: Music) {
        if (music.id) {
            return this.http.put<Music>(this.endpoint, music, { headers: REQ_HEADER })
        }
        return this.http.post<Music>(this.endpoint, music, { headers: REQ_HEADER })
    }

    deleteMusic(id: number) {
        return this.http.delete<Music>(this.endpoint + id, { headers: REQ_HEADER });
    }

    getMusicsFromAlbum(id: number) {
        return this.http.get<Array<Music>>(this.endpoint + 'Album/' + id, { headers: REQ_HEADER });

    }
}