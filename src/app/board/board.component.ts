import { Component, OnInit } from '@angular/core';
import { Tile, BoardFieldStatus } from './tile.model';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

	// plansza gry
	board: Tile[][];

  

  constructor(private boardService: BoardService) { }

  ngOnInit() {
  	// referencja do planszy w serwisie boardService
  	this.board  = this.boardService.board;
  }

  tileClicked(clickedBoardTile: Tile, rowIndex: number, colIndex: number){
  // rowIndex, colIndex - aktualne położenie klikniętego Tile na planszy (w tablicy)

    // sprawdzenie, czy tile jest aktywny (tj. czy można na niego w ogóle kliknąć)
    if(clickedBoardTile.boardFieldStatus === BoardFieldStatus.Active){
      console.log(clickedBoardTile);
      this.boardService.putTileOnBoard(clickedBoardTile, rowIndex, colIndex);
    }

  }



}
