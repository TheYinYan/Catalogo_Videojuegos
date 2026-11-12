import {
  Component,
  inject,
  input,
  output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { GameService } from '../services/game.service';
import { Game } from '../models/game';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-crud',
  imports: [FormsModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css',
})
export class CrudComponent {
  private gameServer = inject(GameService);

  actGame = output<Game>();
  editGame = input.required<Game | undefined>();
  edit = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editGame']?.currentValue) {
      this.game = { ...changes['editGame'].currentValue };
      this.edit = true;
    }
  }

  game: Game = {
    title: '',
    genre: '',
    platform: '',
    price: 0,
    stock: 0,
  };

  onSaveGame(form: NgForm) {
    if (form.invalid) {
      return;
    }

    console.log(this.game);
    console.log(form.value);

    if (this.edit) {
      this.gameServer.putGame(this.game).subscribe((updateGame) => {
        console.log(`Upadate Game: ${this.game}`);
        form.resetForm();
        this.edit = false;
        this.actGame.emit(updateGame);
      });
    } else {
      this.gameServer.postGame(this.game).subscribe((NewGame) => {
        console.log(`New Game: ${this.game}`);
        form.resetForm();
        this.actGame.emit(NewGame);
      });
    }
  }
}
