import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/games';

  constructor() {}
  getGames() {
    return this.http.get<Game[]>(this.apiUrl);
  }

  getGame(id: number) {
    return this.http.get<Game>(this.apiUrl + `/${id}`);
  }

  getGameGenre(genre: string) {
    return this.http.get<Game[]>(this.apiUrl + `?genre=${genre}`);
  }
}
