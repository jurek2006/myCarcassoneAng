import { Component, OnInit } from '@angular/core';
import { TilesService } from '../../tiles.service';
import { Tile, CityOnTile } from '../../models/tile.model';

@Component({
  selector: 'app-testing-drawed-tile',
  templateUrl: './testing-drawed-tile.component.html',
  styleUrls: ['./testing-drawed-tile.component.css']
})
export class TestingDrawedTileComponent implements OnInit {

	componentVisible: boolean = true;
	selectedTile: Tile;

  constructor(private tilesService: TilesService) { }

  ngOnInit() {
  	this.selectedTile = this.tilesService.getSelectedTile();
  	this.tilesService.selectedTileChanged.subscribe(
  		(newSelectedTile: Tile) => {
  			this.selectedTile = newSelectedTile;
  		}
  	);
  }

  toggleDisplay(){
  	this.componentVisible = !this.componentVisible;
  }

}
