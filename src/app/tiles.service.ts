import { Component, OnInit, EventEmitter } from '@angular/core';
import { Tile, CityOnTile } from './models/tile.model';

// TilesService przechowuje dane o płytkach (tiles)

export class TilesService{

	// emiter - za każdym razem, kiedy zmieni się wybrana płytka
	selectedTileChanged = new EventEmitter<Tile>();

	private tiles: Tile[] = [
		new Tile("tileA01.jpg", new CityOnTile() ),
		new Tile("tileA02.jpg", new CityOnTile(1,0,1,0,1) ),
		new Tile("tileA03.jpg", new CityOnTile() )
	];

	// private selectedTile: Tile = this.tiles[0];
	private selectedTile: Tile = Object.assign({}, this.tiles[0]);
	// właściwość opisująca obrócenie płytki (na potrzeby umieszczenia jej w polu)

	getSelectedTile(): Tile{
		return this.selectedTile;
	}

	selectedTileClicked(): Tile{
		this.tiles.shift();
		this.selectedTile = this.tiles[0];
		this.selectedTileChanged.emit(this.getSelectedTile());
		return this.selectedTile;
	}

	setSelectedTileRotation(clockWiseRotation: number): Tile{
		if(clockWiseRotation === 90 || clockWiseRotation === 180 || clockWiseRotation === 270){
			// uaktualnienie aktualnego obrotu
			this.selectedTile.rotation = (this.selectedTile.rotation + clockWiseRotation) % 360;
			this.selectedTileChanged.emit(this.getSelectedTile());
		}
		return this.selectedTile;
		
	}

	// getSelectedTileRotation(): number{
	// 	return this.selectedTile.rotation;
	// }

}