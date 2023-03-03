import { Album } from "./album.model";

export class Music {
    public id? : number;
    public name: string;
    public albumId: number;
    public album: Album;

    constructor(name: string, albumId: number, id?: number) {
        this.id = id;
        this.albumId = albumId;
        this.name = name;
    }
}