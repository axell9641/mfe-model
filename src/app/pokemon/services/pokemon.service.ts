import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonItem } from 'src/app/model/pokemon-item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl: string;
  private imageUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.apiUrl}/pokemon`;
    this.imageUrl =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home';
  }

  getPokemons(limit: number): Observable<PokemonItem[]> {
    return this.http.get(`${this.baseUrl}/?limit=${limit}`).pipe(
      map((res: any) =>
        res['results'].map((p: any) => {
          const parts = p.url.split('/');
          const id = parts[parts.length - 2];
          return {
            ...p,
            id,
            image: `${this.imageUrl}/${id}.png`,
          } as PokemonItem;
        })
      )
    );
  }
}
