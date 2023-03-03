import { HttpHeaders } from "@angular/common/http";

export const LOCAL_URL = 'https://localhost:7214/api/';

export const REQ_HEADER = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type',
    'No-Auth': 'True'
});

