import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { LOCAL_URL, REQ_HEADER } from '../const';
import { Genre } from '../models/genre.model';


@Injectable()
export class GenreService {

    endpoint = LOCAL_URL + 'Genre/'

    constructor(private http: HttpClient) { }

    getAllGenres() {
        return this.http.get<Array<Genre>>(this.endpoint, { headers: REQ_HEADER });
    }

    getGenre(id: number) {
        return this.http.get<Genre>(this.endpoint + id, { headers: REQ_HEADER });
    }

    saveGenre(genre: Genre) {
        if (genre.id) {
            return this.http.put<Genre>(this.endpoint, genre, { headers: REQ_HEADER })
        }
        return this.http.post<Genre>(this.endpoint, genre, { headers: REQ_HEADER })
    }

    deleteGenre(id: number) {
        return this.http.delete<Genre>(this.endpoint + id, { headers: REQ_HEADER });
    }
}