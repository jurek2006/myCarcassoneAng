import { Component, OnInit } from '@angular/core';

import { Tile } from './tile.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

	board: Tile[] = [new Tile(0,'red', false), new Tile(1,'blue', true) ];

  constructor() { }

  ngOnInit() {
  }

  tileClicked(boardTile: Tile){
  	console.log(boardTile);
  	if(boardTile.statusActive){
  	  	this.board.push(new Tile(2,'yellow', false));
  	}
  }

}
