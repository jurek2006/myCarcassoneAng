import { Component, OnInit } from '@angular/core';
import { Tile, CityOnTile } from '../models/tile.model';
import { TilesService } from '../tiles.service';


@Component({
  selector: 'app-drawed-tile',
  templateUrl: './drawed-tile.component.html',
  styleUrls: ['./drawed-tile.component.css'],
})
export class DrawedTileComponent implements OnInit {

	selectedTile: Tile; //referencja do aktualnej płytko "do położenia" (pobierane z TilesService)
  // DO USUNIĘCIA selectedTileRotation: number; //aktualny obrót płytko "do położenia" (pobierane z TilesService)

  constructor(private tilesService: TilesService) { }

  ngOnInit() {
  	this.selectedTile = this.tilesService.getSelectedTile();
    // this.selectedTileRotation = this.tilesService.getSelectedTileRotation();
  }

  imageTestClick(){
  	this.selectedTile =  this.tilesService.selectedTileClicked();
  }

  onRotateTile(clockWiseRotation: number){
    this.selectedTile = this.tilesService.setSelectedTileRotation(clockWiseRotation);
  }

}
