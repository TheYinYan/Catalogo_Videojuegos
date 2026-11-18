import { Component, inject, input, output, SimpleChanges } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators,} from '@angular/forms';
import { GameService } from '../services/game.service';
import { Game } from '../models/game';

@Component({
  selector: 'app-crud',
  imports: [ReactiveFormsModule ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css',
})
export class CrudComponent {
  private gameServer = inject(GameService);

  actGame = output<Game>();
  editGame = input.required<Game | undefined>();
  edit = false;

  title = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });

  genre = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  platform = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  price = new FormControl(0, {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(0.01),
      Validators.maxLength(100),
    ],
  });

  stock = new FormControl(0, {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(999),
    ],
  });

  formGroup = new FormGroup({
    title: this.title,
    genre: this.genre,
    platform: this.platform,
    price: this.price,
    stock: this.stock
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editGame']?.currentValue) {
      // this.game = { ...changes['editGame'].currentValue };
      this.formGroup.setValue(changes['editGame'].currentValue)
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

  onSaveGame(form: FormGroupDirective) {
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
