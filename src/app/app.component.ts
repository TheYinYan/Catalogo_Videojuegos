import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Game } from './models/game';
import { GameService } from './services/game.service';
import { CrudComponent } from './crud/crud.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CrudComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Catalogo de Videojuegos';
  games: Game[] = [];

  verForm = false;
  selectedGenre = '';
  selectedPlatform = '';
  titulo = '';
  q = '';
  minPrice = 0;
  maxPrice = 0;
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;
  editGame?: Game;

  constructor(private gameServer: GameService) {}

  ngOnInit(): void {
    this.cargarPagina();
  }

  onCrear(){
    this.verForm = !this.verForm
  }

  cargarPagina(): void {
    this.gameServer
      .getGamesPage(
        this.currentPage,
        this.pageSize,
        this.selectedGenre,
        this.selectedPlatform,
        this.q,
        this.titulo,
        this.minPrice,
        this.maxPrice
      )
      .subscribe((response) => {
        this.games = response.body ?? [];

        this.totalItems = Number(response.headers.get('X-Total-Count') ?? 0);

        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      });
  }

  onBuscarId(id: string) {
    if (id === '') {
      this.ngOnInit();
    } else {
      this.currentPage = 1;
      this.gameServer.getGame(+id).subscribe((game) => {
        this.games = [game];
      });
    }
  }

  onBuscarTitulo(title: string) {
    this.titulo = title;
    this.cargarPagina();
  }

  onBuscarGlobal(value: string) {
    this.q = value;
    this.cargarPagina();
  }

  onBuscarPrecio(price_gte: string, price_lte: string) {
    this.minPrice = price_gte ? +price_gte : 0;
    this.maxPrice = price_lte ? +price_lte : 0;
    this.cargarPagina();
  }

  onGenreChange(genre: string): void {
    this.selectedGenre = genre;
    this.cargarPagina();
  }

  onPlatformChange(platform: string): void {
    this.selectedPlatform = platform;
    this.cargarPagina();
  }

  onPageSizeChange(limit: string): void {
    this.pageSize = +limit;
    this.currentPage = 1;
    this.cargarPagina();
  }

  paginaAnterior(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.cargarPagina();
    }
  }

  paginaSiguiente(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.cargarPagina();
    }
  }

  onActGame(game:Game){
    this.cargarPagina();
  }
}
