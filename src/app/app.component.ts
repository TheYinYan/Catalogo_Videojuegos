import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Game } from './models/game';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Catalogo de Videojuegos';
  games: Game[] = [];

  selectedGenre = '';
  selectedPlatform = '';
  minPrice = 0; 
  maxPrice = 0; 

  constructor(private gameServer: GameService) { }

  ngOnInit(): void {
    this.gameServer.getGames().subscribe((games) => {
      this.games = games;
    });
  }

  private aplicarFiltros(): void {
    const genre = this.selectedGenre;
    const platform = this.selectedPlatform;

    if (genre && platform) {
      this.gameServer.getGameplatformGenre(platform, genre).subscribe((games) => {
        this.games = games;
      });
    } else if (genre) {
      this.gameServer.getGameGenre(genre).subscribe((games) => {
        this.games = games;
      });
    } else if (platform) {
      this.gameServer.getGameplatform(platform).subscribe((games) => {
        this.games = games;
      });
    } else {
      this.ngOnInit();
    }
  }

  private aplicarFiltrosPrecio(price_gte: number, price_lte: number): void {
    if (price_gte !== 0 && price_lte !== 0) {
      this.gameServer.getGameprice(price_gte, price_lte).subscribe((games) => {
        this.games = games;
      });
    } else if (price_gte !== 0) {
      this.gameServer.getGamepriceMin(price_gte).subscribe((games) => {
        this.games = games;
      });
    } else if (price_lte !== 0) {
      this.gameServer.getGamepriceMax(price_lte).subscribe((games) => {
        this.games = games;
      });
    } else {
      this.ngOnInit();
    }
  }

  onBuscarId(id: string) {
    if (id === '') {
      this.ngOnInit();
    } else {
      this.gameServer.getGame(+id).subscribe((game) => {
        this.games = [game];
      });
    }
  }

  onBuscarTitulo(title: string) {
    if (title === '') {
      this.ngOnInit();
    } else {
      this.gameServer.getGameTitle(title).subscribe((game) => {
        this.games = game;
      });
    }
  }

  onBuscarPrecio(price_gte: string, price_lte: string) {
    this.minPrice = price_gte ? +price_gte : 0;
    this.maxPrice = price_lte ? +price_lte : 0;
    
    this.aplicarFiltrosPrecio(this.minPrice, this.maxPrice);
  }

  onGenreChange(genre: string): void {
    if (genre !== '') {
      this.minPrice = 0;
      this.maxPrice = 0;
    }
    this.selectedGenre = genre;
    this.aplicarFiltros();
  }

  onPlatformChange(platform: string): void {
    if (platform !== '') {
      this.minPrice = 0;
      this.maxPrice = 0;
    }
    this.selectedPlatform = platform;
    this.aplicarFiltros();
  }
}