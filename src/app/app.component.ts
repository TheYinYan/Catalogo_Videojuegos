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
  constructor(private gameServer: GameService) {}

  ngOnInit(): void {
    this.gameServer.getGames().subscribe((games) => {
      this.games = games;
    });
  }

  onBuscarId(id: string) {
    if (id === undefined || id === '') {
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
      this.gameServer.getGameGenre(genre).subscribe((game) => {
        this.games = game;
      });
    }
  }
}
