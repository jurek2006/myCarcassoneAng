import { Component, OnInit } from '@angular/core';
import { Tile, CityOnTile } from '../../models/tile.model';
import { BoardService } from '../../board.service';

@Component({
  selector: 'app-testing-occupied-field',
  templateUrl: './testing-occupied-field.component.html',
  styleUrls: ['./testing-occupied-field.component.css']
})
export class TestingOccupiedFieldComponent implements OnInit {

	componentVisible: boolean = true;
	tileOnClickedField: Tile;

  constructor(private boardService: BoardService) { }

  ngOnInit() {
  	this.boardService.occupiedFieldSelected.subscribe(
  		(fieldSelected: Tile) => {
  			this.tileOnClickedField = fieldSelected;
  		}
  	);
  }

  toggleDisplay(){
  	this.componentVisible = !this.componentVisible;
  }
}
