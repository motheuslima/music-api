import { Album } from "./album.model";

export class Artist {
    public id?: number;
    public name: string;
    
    constructor(name: string, id?: number) {
        this.id = id;
        this.name = name;
    }
}