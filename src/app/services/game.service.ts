import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getGameGlobal(q: string) {
    return this.http.get<Game[]>(this.apiUrl + `?q=${q}`);
  }

  getGameTitle(title: string) {
    return this.http.get<Game[]>(this.apiUrl + `?title_like=${title}`);
  }

  getGamepriceMax(price_lte: number) {
    return this.http.get<Game[]>(this.apiUrl + `?price_lte=${price_lte}`);
  }

  getGamepriceMin(price_gte: number) {
    return this.http.get<Game[]>(this.apiUrl + `?price_gte=${price_gte}`);
  }

  getGameprice(price_gte: number, price_lte: number) {
    return this.http.get<Game[]>(
      this.apiUrl + `?price_gte=${price_gte}&price_lte=${price_lte}`,
    );
  }

  getGameGenre(genre: string) {
    return this.http.get<Game[]>(this.apiUrl + `?genre=${genre}`);
  }

  getGameplatform(platform: string) {
    return this.http.get<Game[]>(this.apiUrl + `?platform=${platform}`);
  }

  getGameplatformGenre(platform: string, genre: string) {
    return this.http.get<Game[]>(
      this.apiUrl + `?genre=${genre}&platform=${platform}`,
    );
  }

  getGamesPage(
    page: number,
    limit: number,
    genre: string,
    platform: string,
    q: string,
    title: string,
    minPrice: number,
    maxPrice: number,
  ) {
    let params = new HttpParams().set('_page', page).set('_limit', limit);

    if (genre) {
      params = params.set('genre', genre);
    }

    if (platform) {
      params = params.set('platform', platform);
    }

    if (q) {
      params = params.set('q', q);
    }

    if (title) {
      params = params.set('title_like', title);
    }

    if (minPrice) {
      params = params.set('price_gte', minPrice);
    }

    if (maxPrice) {
      params = params.set('price_lte', maxPrice);
    }

    return this.http.get<Game[]>(this.apiUrl, {
      params,
      observe: 'response',
    });
  }
}
