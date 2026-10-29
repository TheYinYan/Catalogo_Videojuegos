import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Game } from './models/game';
import { GameService } from './services/game.service';
import { Observable } from 'rxjs';

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

  constructor(private gameServer: GameService) { }

  ngOnInit(): void {
    this.gameServer.getGames().subscribe((games) => {
      this.games = games;
    });
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

  onGenreChange(genre: string): void {
    if (genre === '') {
      this.ngOnInit();
    } else {
      this.selectedGenre = genre;
      // this.currentPage = 1;
      if (this.selectedPlatform !== "") {
        this.gameServer.getGameplatformGenre(this.selectedPlatform, genre).subscribe((games) => {
          this.games = games;
        });
      }
      else {
        this.gameServer.getGameGenre(genre).subscribe((games) => {
          this.games = games;
        });
      }
    }
  }

  onPlatformChange(platform: string) {
    if (platform === '') {
      this.ngOnInit();
    } else {
      this.selectedPlatform = platform;
      // this.currentPage = 1;
      if (this.selectedGenre !== "") this.gameServer.getGameplatformGenre(platform, this.selectedGenre).subscribe((games) => {
        this.games = games;
      });
      else {
        this.gameServer.getGameplatform(platform).subscribe((games) => {
          this.games = games;
        });
      }
    }
  }
}
