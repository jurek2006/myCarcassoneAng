import { Component, OnInit } from '@angular/core';
import { BoardField, BoardFieldStatus } from '../models/board-field.model';
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
  	this.board  = this.boardService.getBoard();
  }

  fieldClicked(clickedBoardField: BoardField, rowIndex: number, colIndex: number){
  // rowIndex, colIndex - aktualne położenie klikniętego pola na planszy (w tablicy)

      this.board = this.boardService.putTileOnBoard(clickedBoardField, rowIndex, colIndex);


  }



}
