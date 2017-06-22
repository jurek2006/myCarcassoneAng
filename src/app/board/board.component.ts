import { Component, OnInit } from '@angular/core';
import { BoardField, BoardFieldStatus } from '../models/board-field.model';
import { BoardService } from '../board.service';
import { TilesService } from '../tiles.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

	// plansza gry
	board: BoardField[][];

  

  constructor(private boardService: BoardService, private tilesService: TilesService) { }

  ngOnInit() {
  	// referencja do planszy w serwisie boardService
  	this.board  = this.boardService.getBoard();
  }

  fieldClicked(clickedBoardField: BoardField, rowIndex: number, colIndex: number){
  // funkcja obsługująca kliknięcie (próbę położenia płytki) na pole planszy
  // clickedBoardField - referencja do klikniętego pola
  // rowIndex, colIndex - aktualne położenie klikniętego pola na planszy (w tablicy)
  // this.tilesService.getSelectedTile() to aktualna płytka (tile) którą próbujemy położyć na planszy

      this.board = this.boardService.putTileOnBoard(clickedBoardField, rowIndex, colIndex, this.tilesService.getSelectedTile() );

  }



}
