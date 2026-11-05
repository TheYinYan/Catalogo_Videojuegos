import { Component, inject } from '@angular/core';
import { FormsModule , NgModel } from '@angular/forms';
import { GameService } from '../services/game.service';
import { Game } from '../models/game';

@Component({
  selector: 'app-crud',
  imports: [FormsModule, ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css',
})
export class CrudComponent {
  private gameServer = inject(GameService);

  game: Game = {
    title: '',
    genre: '',
    platform: '',
    price: 0,
    stock: 0,
  };

  onSaveGame(){
    console.log(this.game)
  }
}
