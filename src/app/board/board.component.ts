import { Component, OnInit } from '@angular/core';
import { BoardField, BoardFieldStatus } from './board-field.model';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

	// plansza gry
	board: BoardField[][];

  

  constructor(private boardService: BoardService) { }

  ngOnInit() {
  	// referencja do planszy w serwisie boardService
  	this.board  = this.boardService.board;
  }

  fieldClicked(clickedBoardField: BoardField, rowIndex: number, colIndex: number){
  // rowIndex, colIndex - aktualne położenie klikniętego pola na planszy (w tablicy)

    // sprawdzenie, czy pole jest aktywny (tj. czy można na niego w ogóle kliknąć)
    if(clickedBoardField.boardFieldStatus === BoardFieldStatus.Active){
      console.log(clickedBoardField);
      this.boardService.putTileOnBoard(clickedBoardField, rowIndex, colIndex);
    }

  }



}
