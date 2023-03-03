import { Artist } from "./artist.model";
import { Genre } from "./genre.model";
import { Music } from "./music.model";

export class Album {
    public id?: number;
    public name: string;

    public genreId: number;
    public genre: Genre;

    public artistId: number;
    public artist: Artist;

    public musics: Array<Music>;

    constructor(name: string, genreId: number, artistId:number, musics: Array<Music>, id?: number) {
        this.id = id;
        this.name = name;
        this.genreId = genreId;
        this.artistId = artistId;
        this.musics = musics;
    }
}