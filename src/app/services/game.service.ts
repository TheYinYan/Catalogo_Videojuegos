import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/games';

  constructor() { }
  getGames() {
    return this.http.get<Game[]>(this.apiUrl);
  }

  getGame(id: number) {
    return this.http.get<Game>(this.apiUrl + `/${id}`);
  }

  getGameGlobal(q: string) {
    return this.http.get<Game[]>(this.apiUrl + `?q=${q}`);
  }

  getGameTitle(title: string) {
    return this.http.get<Game[]>(this.apiUrl + `?title_like=${title}`);
  }

  getGameGenre(genre: string) {
    return this.http.get<Game[]>(this.apiUrl + `?genre=${genre}`);
  }

  getGameplatform(platform: string) {
    return this.http.get<Game[]>(this.apiUrl + `?platform=${platform}`);
  }

  getGameplatformGenre(platform: string, genre: string) {
    return this.http.get<Game[]>(this.apiUrl + `?genre=${genre}&platform=${platform}`);
  }
}
