import { Component, OnInit } from '@angular/core';
import { Tile, CityOnTile } from './models/tile.model';

// TilesService przechowuje dane o płytkach (tiles)

// TESTOWE

export class TilesService{
	private tiles: Tile[] = [
		new Tile("tileA01.jpg", new CityOnTile(0,0,0,0,0) ),
		new Tile("tileA02.jpg", new CityOnTile(0,0,0,0,0) ),
		new Tile("tileA03.jpg", new CityOnTile(0,0,0,0,0) )
	];

	private selectedTile: Tile = this.tiles[0];
	// właściwość opisująca obrócenie płytki (na potrzeby umieszczenia jej w polu)
	private selectedTileRotation: number = 0;

	getSelectedTile(): Tile{
		return this.selectedTile;
	}

	selectedTileClicked(): Tile{
		this.tiles.shift();
		return this.selectedTile = this.tiles[0];
	}

	setSelectedTileRotation(clockWiseRotation: number): number{
		if(clockWiseRotation === 90 || clockWiseRotation === 180 || clockWiseRotation === 270){
			// uaktualnienie aktualnego obrotu
			this.selectedTileRotation = (this.selectedTileRotation + clockWiseRotation) % 360;
			// testowe:
			console.log(this.selectedTileRotation);
		}
		return this.selectedTileRotation;
		
	}

	getSelectedTileRotation(): number{
		return this.selectedTileRotation;
	}

}