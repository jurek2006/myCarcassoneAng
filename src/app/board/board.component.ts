import { Component, OnInit } from '@angular/core';
import { Tile } from './tile.model';
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

  tileClicked(clickedBoardTile: Tile){
  	console.log(clickedBoardTile);
  	if(clickedBoardTile.active){
  	  	// console.log(clickedBoardTile);
  	  	console.log(this.board);
  	  	clickedBoardTile.active = false;
  	  	clickedBoardTile.occupied = true;

  	}else{
  		console.log("Nie można umieścić - pole nieaktywne");
  	}
  }



}
