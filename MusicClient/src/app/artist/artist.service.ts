import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_URL, REQ_HEADER } from '../const';
import { Artist } from '../models/artist.model';
import { DiscographyAlbum } from '../models/discographyAlbum.model';

@Injectable()
export class ArtistService {
    endpoint = LOCAL_URL + 'Artist/'

    constructor(private http: HttpClient) { }

    getAllArtists() {
        return this.http.get<Array<Artist>>(this.endpoint, { headers: REQ_HEADER });
    }

    getArtist(id: number) {
        return this.http.get<Artist>(this.endpoint + id, { headers: REQ_HEADER });
    }

    saveArtist(artist: Artist) {
        if (artist.id) {
            return this.http.put<Artist>(this.endpoint, artist, { headers: REQ_HEADER })
        }
        return this.http.post<Artist>(this.endpoint, artist, { headers: REQ_HEADER })
    }

    deleteArtist(id: number) {
        return this.http.delete<Artist>(this.endpoint + id, { headers: REQ_HEADER });
    }

    getArtistDiscography(id: number) {
        return this.http.get<Array<DiscographyAlbum>>(LOCAL_URL + 'Music/Artist/' + id, { headers: REQ_HEADER });
    }
}