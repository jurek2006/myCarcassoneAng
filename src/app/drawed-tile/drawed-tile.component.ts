import { Component, OnInit } from '@angular/core';
import { Tile, CityOnTile } from '../models/tile.model';
import { TilesService } from '../tiles.service';


@Component({
  selector: 'app-drawed-tile',
  templateUrl: './drawed-tile.component.html',
  styleUrls: ['./drawed-tile.component.css'],
})
export class DrawedTileComponent implements OnInit {

	selectedTile: Tile;

  constructor(private tilesService: TilesService) { }

  ngOnInit() {
  	this.selectedTile = this.tilesService.getSelectedTile();
  }

  imageTestClick(){
  	this.selectedTile =  this.tilesService.selectedTileClicked();
  }

}
